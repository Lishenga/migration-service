// postgres/postgres.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeTypes } from 'src/postgres-module/enums/code-types.enum';
import { ObjectID, Repository } from 'typeorm';
import { Item } from '../entities/mongo/make/item.entity';
import { BulkCodeEvent } from '../entities/mongo/manage/bulkCodeEvent';
import { CodeEvent } from '../entities/mongo/manage/codeEvent.entity';
import { CodeGenerator } from '../entities/mongo/manage/codeGen.entity';
import { ItemFleet } from '../entities/mongo/manage/itemFleet.entity';

@Injectable()
export class MongoDBService {
  constructor(
    @InjectRepository(CodeEvent, 'mongodb')
    private readonly codeEventRepository: Repository<CodeEvent>,
    @InjectRepository(BulkCodeEvent, 'mongodb')
    private readonly bulkCodeEventRepository: Repository<BulkCodeEvent>,
    @InjectRepository(CodeGenerator, 'mongodb')
    private readonly codegenRepository: Repository<CodeGenerator>,
    @InjectRepository(Item, 'mongodb')
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(ItemFleet, 'mongodb')
    private readonly itemFleetRepository: Repository<ItemFleet>,
  ) {}

  async getSepcificCodeEvent(
    codeType: CodeTypes,
    codeGenerator: ObjectID,
    codeDays: number,
    codeDecString: string,
  ): Promise<CodeEvent> {
    return await this.codeEventRepository.findOneBy({
      codeType,
      codeGenerator,
      codeDays,
      codeDecString,
    });
  }

  async insertCodeEvents(codeEvents: CodeEvent[]) {
    // return await this.codeEventRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .values(codeEvents)
    //   .orIgnore()
    //   .execute();
    // console.log('Successfully inserted', result.insertedCount, 'documents');
    return await this.codeEventRepository.insert(codeEvents);
  }
  async findItem(productItemOemSn: string) {
    return await this.itemRepository.findOneBy({
      oemItemID: productItemOemSn,
    });
  }

  async findCodeGen(_id: ObjectID) {
    return await this.codegenRepository.findOneBy({
      _id: _id,
    });
  }

  async findItemFleet(_id: ObjectID) {
    return await this.itemFleetRepository.findOneBy({
      _id: _id,
    });
  }
}
