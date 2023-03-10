import {
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, QueryFailedError, Repository } from 'typeorm';
import * as _ from 'lodash';
import { AssignedItems } from '../entities/postgres/assignedItems';
import { CodeHistory } from '../entities/postgres/codehistory.entity';
import { OtpGenerator } from '../entities/postgres/otpgenerator.entity';
import { OtpSystem } from '../entities/postgres/otpsystem.entity';
import { ProductBatch } from '../entities/postgres/productbatch.entity';
import { ProductItem } from '../entities/postgres/productitem.entity';
import { ActorTypes } from '../enums/actor-types.enum';
import { ActionScope } from '../enums/action-scope.enum';
import { CodeTypes } from '../enums/code-types.enum';
import { MongoDBService } from 'src/mongo-dbmodule/service/mongodb.service';
import { BulkCodeEvent } from 'src/mongo-dbmodule/entities/mongo/manage/bulkCodeEvent';
import { CodeEvent } from 'src/mongo-dbmodule/entities/mongo/manage/codeEvent.entity';
import { Mongo2DBService } from 'src/mongo-2-dbmodule/services/mongodb.service';

@Injectable()
export class DataMigrationService {
  constructor(
    @InjectRepository(OtpGenerator, 'postgres')
    private otpGenRepository: Repository<OtpGenerator>,
    @InjectRepository(AssignedItems, 'postgres')
    private assignedItemsRepository: Repository<AssignedItems>,
    @InjectRepository(OtpSystem, 'postgres')
    private otpSystemRepository: Repository<OtpSystem>,
    @InjectRepository(ProductItem, 'postgres')
    private productItemRepository: Repository<ProductItem>,
    @InjectRepository(CodeHistory, 'postgres')
    private codeHistoryRepository: Repository<CodeHistory>,
    @InjectRepository(ProductBatch, 'postgres')
    private productBatchRepository: Repository<ProductBatch>,
    private readonly mongodbService: MongoDBService,
    private readonly mongodb2Service: Mongo2DBService,
    private elasticsearchService: ElasticsearchService,
  ) {}

  async transfer() {
    console.log('transfer');
    // const data = await this.productItemRepository.find({
    //   where: {
    //     productItemId: MoreThanOrEqual(523227),
    //   },
    //   take: 1000000,
    // });
    // 1414887
    const data = await this.productItemRepository.find({
      where: {
        productItemId: MoreThanOrEqual(295940),
      },
      order: {
        productItemId: 'ASC',
      },
    });
    // const codehistories = await this.codeHistoryRepository.findOneBy({
    //   codeValue: '*042 799 527 633 184 675 763#',
    // });
    // const otpGen = await this.otpGenRepository.findOneBy({
    //   otpGeneratorId: codehistories.otpGeneratorId,
    // });
    // const item = await this.productItemRepository.findOneBy({
    //   productItemId: otpGen.otpGeneratorId,
    // });
    // console.log(item);

    let itemsMigrated = 286239;
    for (let i = 0; i < data.length; i++) {
      console.log(
        `${data[i].productItemId} is the productItemId for the item the code histories are being migrated.`,
      );
      try {
        await this.postgresToMongoEntity(data[i]);
      } catch (error) {
        console.log(error);
      }
      itemsMigrated = itemsMigrated + 1;
      console.log(`${itemsMigrated} this is the number of the items migrated.`);
    }
  }

  private async postgresToMongoEntity(productItem: ProductItem) {
    const otpGen = await this.otpGenRepository.findOneBy({
      otpGeneratorId: productItem.productItemId,
    });
    if (otpGen != null) {
      const codehistories = await this.codeHistoryRepository.find({
        where: { otpGeneratorId: otpGen.otpGeneratorId },
      });

      console.log(
        `Number of code histories being migrated are: ${codehistories.length}`,
      );
      if (codehistories.length > 0) {
        const item = await this.mongodbService.findItem(
          productItem.productItemOemSn,
        );
        if (item) {
          if (item.codeGenerator != null) {
            const codeGenerator = await this.mongodbService.findCodeGen(
              item.codeGenerator,
            );

            const itemfleet = await this.mongodbService.findItemFleet(
              item.fleet,
            );
            if (itemfleet) {
              if (itemfleet.distributor) {
                // const distributor = await this.helperService.getDistributor(
                //   itemfleet.distributor,
                //   user,
                // );

                console.log(
                  ` Checking in elastic search if distributor email exists`,
                );
                const distsSearch = await this.elasticsearchService.search({
                  index: 'distributor',
                  query: {
                    query_string: {
                      query: '*' + itemfleet.distributor + '*',
                    },
                  },
                });

                const persons = [];
                const dists = _.map(
                  distsSearch.hits.hits,
                  '_source.orgContactPerson',
                );
                console.log(
                  ` Looping data from elastic search to check if distributor email exists`,
                );
                for (const dist of dists) {
                  const personSearch = await this.elasticsearchService.search({
                    index: 'person',
                    query: {
                      query_string: {
                        query: '*' + dist + '*',
                      },
                    },
                  });

                  persons.push(...personSearch.hits.hits);
                }

                console.log(
                  ` Done looping data from elastic search to check if distributor email exists`,
                );

                const distEmails = _.map(persons, '_source.contact.email');

                const prohibitEmails = [
                  'ov@xsolarsystems.com',
                  'omondigrace22@gmail.com',
                  'oves@moon.community',
                  'ikeji.c@vesselnetintegrated.com',
                  'kachubomeddy@gmail.com',
                  'lameck@ensol.co.tz',
                  'rodgers@omnivoltaic.net',
                  'Langulo@enersol-sa.com',
                ];

                console.log(distEmails);

                console.log(
                  ` The Product Item for the migrated Code Histories is ${productItem.productItemId}`,
                );

                const email = distEmails.find((element) => {
                  return prohibitEmails.includes(element);
                });

                if (email != undefined) {
                  throw new NotAcceptableException(
                    `Migrating of codevents with codegenerator of id ${codeGenerator._id} failed as distributor linked to the item with the flagged codegenerator already exists on ERM.`,
                  );
                }
              }
            }

            console.log(
              ` The Product Item for the migrated Code Histories is ${productItem.productItemId} at the start of resolvedEvents`,
            );

            const resolvedEvents = [];
            for (const history of codehistories) {
              try {
                console.log(` Checking for duplicates in the CodeEvent table`);
                const findDup = await this.mongodbService.getSepcificCodeEvent(
                  this.getCodeType(history.codeDays),
                  codeGenerator._id,
                  this.getCodeTypeDays(history.codeDays),
                  history.codeValue,
                );
                console.log(
                  ` Done checking for duplicates in the CodeEvent table`,
                );

                if (findDup) {
                  // return;
                  throw new ConflictException(
                    `Codevent with codeDays: ${history.codeDays}, codeDecString: ${history.codeValue} already exists.`,
                  );
                }

                const codeEvent = new CodeEvent();

                //    bulkCodeEvents[index].type = ActorTypes.DEVICE;
                //    bulkCodeEvents[index].actionScope = ActionScope.DEVELOPMENT;
                //    bulkCodeEvents[index].actorName = 'eIOT';
                //    bulkCodeEvents[index].profile = 'Off-Grid Electric Device';
                //    bulkCodeEvents[index].batchState = BatchState.Scheduled;
                //    bulkCodeEvents[index].lifeCycle = LifeCycle.INITIATED;
                //    bulkCodeEvents[index].thingIdType = ThingIDTypes.UUID;
                //    bulkCodeEvents[index].thingDescription = 'OVES Connected eIoT';
                //    bulkCodeEvents[index].thingCreationDate = new Date();
                // entity.name = data.name;
                // // set more properties as needed

                // codeEvent._id = new mongoose.Types.ObjectId();
                codeEvent.codeType = this.getCodeType(history.codeDays);
                codeEvent.actorName = 'eIOT';
                codeEvent.codeDays = this.getCodeTypeDays(history.codeDays);
                codeEvent.profile = 'Off-Grid Electric Device';
                codeEvent.type = ActorTypes.DEVICE;
                codeEvent.codeNumber = 0;
                codeEvent.actionScope = ActionScope.DEVELOPMENT;
                // codeEvent.codeType = CodeTypes.FREECODE;
                codeEvent.codeGenerator = codeGenerator._id;
                codeEvent.codeHexString = '--';
                codeEvent.codeDecString = history.codeValue;
                codeEvent.deleteStatus = false;
                codeEvent.createdAt = new Date();
                codeEvent.updatedAt = new Date();

                resolvedEvents.push(codeEvent);
                console.log(`Records pushed into the resolvedEvents array`);
              } catch (error) {
                console.log(error);
              }
            }
            // const entities = codehistories.map(async (codehistory) => {});

            console.log(
              ` The Product Item for the migrated Code Histories is ${productItem.productItemId} at the end of resolvedEvents`,
            );

            console.log('Logging the array for the resolvedEvents');
            console.log(resolvedEvents);
            // const resolvedEvents = await Promise.all(entities);
            const save = await this.mongodbService.insertCodeEvents(
              resolvedEvents,
            );
            console.log(save);
          }
        }
      }
    }
  }

  getCodeType = (days: string) => {
    const temp = parseInt(days);
    if (isNaN(temp)) {
      if (days.toLowerCase().includes('free')) {
        return CodeTypes.FREECODE;
      }
      return CodeTypes.RESETCODE;
    } else {
      return CodeTypes.DAYSCODE;
    }
  };

  getCodeTypeDays = (days: string) => {
    const temp = parseInt(days);
    if (isNaN(temp)) {
      if (days.toLowerCase().includes('free')) {
        return 1096;
      }
      return 2192;
    } else {
      return parseInt(days);
    }
  };

  bulkTransfer = async (limit: number, offset: number) => {
    const productItem = await this.productItemRepository.findOneBy({
      productItemOemSn: '12AH2102000376',
    });
    const codehistories = await this.codeHistoryRepository.find({
      where: {
        otpGeneratorId: productItem.productItemId,
        // codeValue: '*026 046 205 043 637 589 145#',
      },
      order: {
        otpGeneratorId: 'ASC',
      },
      take: limit,
      skip: offset,
    });
    console.log(codehistories);
    console.log(codehistories.length)
    // console.log(new Date('2023-02-22T13:12:10.112Z'));
    // const codehistories = await this.codeHistoryRepository.find({
    //   // where: {
    //   //   // codeDate: MoreThanOrEqual(new Date('2023-02-22T13:12:10.112Z')),
    //   //   codeValue: '*026 046 205 043 637 589 145#',
    //   // },
    //   order: {
    //     otpGeneratorId: 'ASC',
    //   },
    //   take: limit,
    //   skip: offset,
    // });
    // console.log(codehistories.length);
    // // 3523136
    // const resolvedEvents = [];
    // for (const history of codehistories) {
    //   try {
    //     const productItem = await this.productItemRepository.findOneBy({
    //       productItemId: history.otpGeneratorId,
    //     });

    //     const item = await this.mongodbService.findItem(
    //       productItem.productItemOemSn,
    //     );
    //     if (item) {
    //       const itemfleet = await this.mongodbService.findItemFleet(item.fleet);
    //       if (itemfleet) {
    //         if (itemfleet.distributor) {
    //           const email = await this.mongodb2Service.findDistributorEmail(
    //             itemfleet.distributor,
    //           );
    //           const prohibitEmails = [
    //             'ov@xsolarsystems.com',
    //             'omondigrace22@gmail.com',
    //             'oves@moon.community',
    //             'ikeji.c@vesselnetintegrated.com',
    //             'kachubomeddy@gmail.com',
    //             'lameck@ensol.co.tz',
    //             'rodgers@omnivoltaic.net',
    //             'Langulo@enersol-sa.com',
    //           ];

    //           console.log(
    //             prohibitEmails.includes(email),
    //             `${email} is the email being checked`,
    //           );

    //           if (prohibitEmails.includes(email)) {
    //             throw new NotAcceptableException(
    //               `Migrating of codevents failed as distributor with email ${email} linked to the item with the flagged codegenerator already exists on ERM.`,
    //             );
    //           }
    //         }
    //       }

    //       if (item.codeGenerator != null) {
    //         const codeGenerator = await this.mongodbService.findCodeGen(
    //           item.codeGenerator,
    //         );
    //         const findDup = await this.mongodbService.getSepcificCodeEvent(
    //           this.getCodeType(history.codeDays),
    //           codeGenerator._id,
    //           this.getCodeTypeDays(history.codeDays),
    //           history.codeValue,
    //         );

    //         if (findDup) {
    //           throw new ConflictException(
    //             `Codevent with codeDays: ${this.getCodeTypeDays(
    //               history.codeDays,
    //             )}, codeType: ${this.getCodeType(
    //               history.codeDays,
    //             )}, codeGenerator: ${codeGenerator._id}, codeDecString: ${
    //               history.codeValue
    //             } already exists.`,
    //           );
    //         }

    //         const codeEvent = new CodeEvent();

    //         //    bulkCodeEvents[index].type = ActorTypes.DEVICE;
    //         //    bulkCodeEvents[index].actionScope = ActionScope.DEVELOPMENT;
    //         //    bulkCodeEvents[index].actorName = 'eIOT';
    //         //    bulkCodeEvents[index].profile = 'Off-Grid Electric Device';
    //         //    bulkCodeEvents[index].batchState = BatchState.Scheduled;
    //         //    bulkCodeEvents[index].lifeCycle = LifeCycle.INITIATED;
    //         //    bulkCodeEvents[index].thingIdType = ThingIDTypes.UUID;
    //         //    bulkCodeEvents[index].thingDescription = 'OVES Connected eIoT';
    //         //    bulkCodeEvents[index].thingCreationDate = new Date();
    //         // entity.name = data.name;
    //         // // set more properties as needed

    //         // codeEvent._id = new mongoose.Types.ObjectId();
    //         codeEvent.codeType = this.getCodeType(history.codeDays);
    //         codeEvent.description = `Migration of Legacy CodeEvents for Item with OemItemID: ${productItem.productItemOemSn}`;
    //         codeEvent.actorName = 'eIOT';
    //         codeEvent.codeDays = this.getCodeTypeDays(history.codeDays);
    //         codeEvent.profile = 'Off-Grid Electric Device';
    //         codeEvent.type = ActorTypes.DEVICE;
    //         codeEvent.codeNumber = 0;
    //         codeEvent.actionScope = ActionScope.DEVELOPMENT;
    //         // codeEvent.codeType = CodeTypes.FREECODE;
    //         codeEvent.codeGenerator = codeGenerator._id;
    //         codeEvent.codeHexString = '--';
    //         codeEvent.codeDecString = history.codeValue;
    //         codeEvent.deleteStatus = false;
    //         codeEvent.createdAt = history.codeDate;
    //         codeEvent.updatedAt = new Date();

    //         resolvedEvents.push(codeEvent);
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // // const entities = codehistories.map(async (codehistory) => {});

    // // const resolvedEvents = await Promise.all(entities);
    // console.log(resolvedEvents);
    // try {
    //   await this.mongodbService.insertCodeEvents(resolvedEvents);
    // } catch (error) {
    //   if (error instanceof QueryFailedError) {
    //     console.error(`Failed to insert records: ${error.message}`);
    //     console.error(`Offending record: ${JSON.stringify(error.parameters)}`);
    //     // Handle the error in a specific way, e.g. retry the insert or log the error.
    //   } else {
    //     console.error(`Failed to insert records: ${error}`);
    //   }
    // }
    // console.log('The end of the bulk transfer');
  };
}

// const itemfleet = await this.mongodbService.findItemFleet(item.fleet);
// if (itemfleet) {
//   if (itemfleet.distributor) {
//     // const distributor = await this.helperService.getDistributor(
//     //   itemfleet.distributor,
//     //   user,
//     // );

//     console.log(` Checking in elastic search if distributor email exists`);
//     const distsSearch = await this.elasticsearchService.search({
//       index: 'distributor',
//       query: {
//         query_string: {
//           query: '*' + itemfleet.distributor + '*',
//         },
//       },
//     });

//     const persons = [];
//     const dists = _.map(distsSearch.hits.hits, '_source.orgContactPerson');
//     console.log(
//       ` Looping data from elastic search to check if distributor email exists`,
//     );
//     for (const dist of dists) {
//       const personSearch = await this.elasticsearchService.search({
//         index: 'person',
//         query: {
//           query_string: {
//             query: '*' + dist + '*',
//           },
//         },
//       });

//       persons.push(...personSearch.hits.hits);
//     }

//     console.log(
//       ` Done looping data from elastic search to check if distributor email exists`,
//     );

//     const distEmails = _.map(persons, '_source.contact.email');

//     const prohibitEmails = [
//       'ov@xsolarsystems.com',
//       'omondigrace22@gmail.com',
//       'oves@moon.community',
//       'ikeji.c@vesselnetintegrated.com',
//       'kachubomeddy@gmail.com',
//       'lameck@ensol.co.tz',
//       'rodgers@omnivoltaic.net',
//       'Langulo@enersol-sa.com',
//     ];

//     console.log(
//       ` The Product Item for the migrated Code Histories is ${productItem.productItemId}`,
//     );

//     const email = distEmails.find((element) => {
//       return prohibitEmails.includes(element);
//     });

//     if (email != undefined) {
//       throw new NotAcceptableException(
//         `Migrating of codevents failed as distributor with email ${distEmails} linked to the item with the flagged codegenerator already exists on ERM.`,
//       );
//     }
//   }
// }
