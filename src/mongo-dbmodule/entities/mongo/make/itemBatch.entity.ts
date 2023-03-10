import { Column, Entity, Index, ManyToOne, OneToOne } from 'typeorm';
import { BatchState } from 'src/postgres-module/enums/batchstate.enum';
import { Actor } from '../actor.entity';
import { ItemSKU } from './itemSKU.entity';

@Entity({ name: 'itembatch' })
@Index(['batchNumber'])
@Index(
  [
    'batchNumber',
    'batchDate',
    'description',
    'batchState',
    'triggers',
    'type',
    'actionScope',
    'actorName',
    'profile',
  ],
  { fulltext: true },
)
export class ItemBatch extends Actor {
  @Column({ unique: true })
  batchNumber!: string;

  @ManyToOne(() => ItemSKU, { eager: true })
  batchSKU!: ItemSKU;

  @Column()
  batchDate!: Date;

  @Column({ nullable: true, default: 'Please add description of batch!' })
  description?: string;

  @Column({ type: 'enum', enum: BatchState, default: BatchState.Scheduled })
  batchState!: BatchState;
}

// import {
//   Entity,
//   EntityRepositoryType,
//   Enum,
//   Filter,
//   ManyToOne,
//   Property,
//   Unique,
//   Index,
// } from '@mikro-orm/core';
// import { Field, ObjectType } from '@nestjs/graphql';
// import { BatchState } from 'src/postgres-module/enums/batchstate.enum';
// import { ItemBatchRepository } from 'src/postgres-module/repositories/itembatch.repository';
// import { Actor } from 'src/postgres-module/entities/actor.entity';
// import { ItemSKU } from 'src/postgres-module/entities/make/itemsku.entity';

// @ObjectType()
// @Entity({ tableName: 'itembatch', customRepository: () => ItemBatchRepository })
// @Index({ name: 'batchNumber', properties: ['batchNumber'] }) // simple index, with custom name
// // @Unique({ properties: ['batchNumber'] })
// // @Unique(["batchNumber"])
// @Filter({
//   name: 'findBatchNumber',
//   cond: (args) => ({ batchNumber: { name: args.batchNumber } }),
// })
// @Index({
//   properties: [
//     'batchNumber',
//     'batchDate',
//     'description',
//     'batchState',
//     'triggers',
//     'type',
//     'actionScope',
//     'actorName',
//     'profile',
//   ],
//   type: 'text',
// })
// export class ItemBatch extends Actor {
//   [EntityRepositoryType]?: ItemBatchRepository;

//   // this isn assigned number by the batch creator mutation
//   // must be unique
//   @Field({
//     description: 'batchNumber has a pattern of ProductClassBases+YYMM+123456',
//   })
//   @Property()
//   public batchNumber!: string;

//   // Designated SKU: each batch must produce or related to a specific SKU!
//   @Field((type) => ItemSKU, {
//     name: 'itemSKU',
//     description: 'ItemSKU must be explicitly specified.',
//   })
//   @ManyToOne()
//   public batchSKU!: ItemSKU;

//   // Date and time of actual production of the batch.  Not the same as the object creation date-time
//   @Field((type) => Date)
//   @Property()
//   public batchDate: Date;

//   // Descriptive notes about a production batch
//   @Field({ description: 'Please add description of batch!' })
//   @Property({ default: 'Please add description of batch!' })
//   public description?: string;

//   // State of batch along the bath
//   @Field((type) => BatchState)
//   @Enum({ items: () => BatchState, default: BatchState.Scheduled })
//   public batchState: BatchState;
// }
