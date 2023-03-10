import { Column, Entity, Index, ObjectID, ObjectIdColumn } from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';
import { Directive } from '@nestjs/graphql';
import { CodeGenerator } from '../manage/codeGen.entity';
import { ItemFleet } from '../manage/itemFleet.entity';
import { Thing } from '../thing.entity';
import { ItemBatch } from './itemBatch.entity';
import { ItemFirmware } from './itemFirmware.entity';
import { ItemSKU } from './itemSKU.entity';
import { ItemStock } from './itemStock.entity';
import { LifeCycle } from 'src/postgres-module/enums/lifecycle.enum';

@ObjectType()
@Directive('@key(fields: "_id")')
@Entity({ name: 'item' })
@Index('oemItemID', ['oemID', 'oemItemID'])
@Index('sellerItemID', ['sellerID', 'sellerItemID'])
@Index(
  'item_text_index',
  [
    'oemID',
    'oemItemID',
    'sellerID',
    'sellerItemID',
    'lifeCycle',
    'idType',
    'idString',
    'description',
    'creationDate',
    'triggers',
    'type',
    'actionScope',
    'actorName',
    'profile',
  ],
  { fulltext: true },
)
export class Item extends Thing {
  @Column({ default: 'OVES' })
  oemID: string;

  @Column()
  oemItemID: string;

  @Column({ default: 'OVES' })
  sellerID: string;

  @Column()
  sellerItemID: string;

  @Field((type) => ItemSKU, {
    name: 'itemSKU',
    description: 'Each item must have an SKU designation',
  })
  @Column({ type: 'string', nullable: true })
  sku?: ObjectID;

  @Field((type) => ItemBatch, { name: 'itemBatch' })
  @Column({ type: 'string', nullable: true })
  batch: ObjectID;

  @Field((type) => ItemFirmware, {
    name: 'itemFirmware',
    defaultValue: 'V1.0.0',
    description:
      'Firmware version must be defined by system.  Not changeable by operator',
  })
  @Column({ type: 'string', nullable: true })
  firmware?: ObjectID;

  @Field((type) => ItemStock, {
    name: 'itemStock',
    nullable: true,
    description: "Identified a seller, such as 'ANGAZA'.",
  })
  @Column({ type: 'string', nullable: true })
  stock?: ObjectID;

  @Field((type) => ItemFleet, { name: 'itemFleet', nullable: true })
  @Column({ type: 'string', nullable: true })
  fleet?: ObjectID;

  @Field()
  @Column({ type: 'string', nullable: true })
  lifeCycle?: LifeCycle;

  @Column({ type: 'string', nullable: true })
  codeGenerator?: ObjectID;
}

// import {
//   Entity,
//   EntityRepositoryType,
//   Enum,
//   ManyToOne,
//   OneToOne,
//   Property,
//   Unique,
//   Index,
// } from '@mikro-orm/core';
// import { Field, ObjectType, Directive } from '@nestjs/graphql';
// import { CodeGenerator } from 'src/postgres-module/entities/manage/codegen.entity';
// import { Thing } from 'src/postgres-module/entities/thing.entity';
// import { ItemBatch } from 'src/postgres-module/entities/make/itembatch.entity';
// import { ItemFirmware } from 'src/postgres-module/entities/make/itemfirmware.entity';
// import { ItemSKU } from 'src/postgres-module/entities/make/itemsku.entity';
// import { ItemStock } from 'src/postgres-module/entities/make/itemstock.entity';
// import { ItemFleet } from 'src/postgres-module/entities/manage/itemfleet.entity';
// import { LifeCycle } from 'src/postgres-module/enums/lifecycle.enum';
// import { ItemRepository } from 'src/postgres-module/repositories/item.repository';

// // place proper decorators

// @ObjectType()
// @Directive('@key(fields: "_id")')
// @Entity({ tableName: 'item', customRepository: () => ItemRepository })
// // @Unique(['oemID', 'oemItemID']) // unique compound id for oem items
// // @Unique(['sellerID', 'sellerItemID']) // unique compound id for seller items
// @Index({ name: 'oemItemID', properties: ['oemID', 'oemItemID'] }) // simple index, with custom name
// // @Unique({ properties: ['oemID', 'oemItemID'] })
// @Index({ name: 'sellerItemID', properties: ['sellerID', 'sellerItemID'] }) // simple index, with custom name
// @Index({
//   properties: [
//     'oemID',
//     'oemItemID',
//     'sellerID',
//     'sellerItemID',
//     'lifeCycle',
//     'idType',
//     'idString',
//     'description',
//     'creationDate',
//     'triggers',
//     'type',
//     'actionScope',
//     'actorName',
//     'profile',
//   ],
//   type: 'text',
// })
// // @Unique({ properties: ['sellerID', 'sellerItemID'] })
// export class Item extends Thing {
//   [EntityRepositoryType]?: ItemRepository;
//   // To help distinguish OEM and to ensure uniqueness within the scope of an OEM, and additional identified is provided
//   // oemItemID+oemID is unique
//   // oemID is provided by the item manufacturer, is typically recorded here verbatim

//   @Field({ defaultValue: 'OVES', description: "Default ItemID is 'OVES'" })
//   @Property({ default: 'OVES' })
//   public oemID: string;

//   // oemID is provided by the item manufacturer, is typically recorded here verbatim
//   @Field({
//     description:
//       'oemItemID cannot be null.  It must be provided in a conformal format PROD+YYMM+000000',
//   })
//   @Property()
//   public oemItemID: string;

//   // @Field()
//   // @Property()
//   // public itemOEM_ID: string; // must be unique.  One solution is to affix OEM identifier, e.g. "OVES-", "ADA-" etc.

//   @Field({ description: "Identified a seller, such as 'ANGAZA'." })
//   @Property({ default: 'OVES' })
//   public sellerID: string;

//   @Field({
//     description:
//       'This is seller designated ID, unique within range.  Cannot be null.  Default same as oemItemID',
//   })
//   @Property()
//   public sellerItemID: string;

//   // This is internal stock keeping unit.  Set it as a separate ID to make the system more flexible
//   @Field((type) => ItemSKU, {
//     name: 'itemSKU',
//     description: 'Each item must have an SKU designation',
//   })
//   @ManyToOne()
//   public sku!: ItemSKU;

//   // This is for production management mainly.
//   // Can also be used as an attribute for multiple selection
//   // This is a many-to-one relationship
//   // many Items can belong to the same ItemBatch
//   // Non-nullable
//   @Field((type) => ItemBatch, { name: 'itemBatch' })
//   @ManyToOne()
//   public batch!: ItemBatch;

//   // Firmware Version string must be strictly controlled!!!
//   // Not to be changeable by operator
//   @Field((type) => ItemFirmware, {
//     name: 'itemFirmware',
//     defaultValue: 'V1.0.0',
//     description:
//       'Firmware version must be defined by system.  Not changeable by operator',
//   })
//   @ManyToOne()
//   public firmware!: ItemFirmware;

//   @Field((type) => ItemStock, {
//     name: 'itemStock',
//     nullable: true,
//     description: "Identified a seller, such as 'ANGAZA'.",
//   })
//   @ManyToOne({ nullable: true })
//   public stock?: ItemStock;

//   // Fleet is for operations management mainly.
//   // This is a many-to-one relationship
//   // many Items can belong to the same ItemFleet
//   // Nullable: a null fleet designation means this item has not been assigned to any manager
//   @Field((type) => ItemFleet, { name: 'itemFleet', nullable: true })
//   @ManyToOne({ nullable: true })
//   public fleet?: ItemFleet;

//   // each item keeps its own lifeCycle state
//   // Nullable.
//   @Field()
//   @Enum({ type: () => LifeCycle, default: LifeCycle.INITIATED })
//   public lifeCycle: LifeCycle;

//   // This is a relationship field, ono-to-one nullable from Item side
//   // An item may have a code generator associated to it.  But a code generator must be attached to a specific product
//   @Field((type) => CodeGenerator, { name: 'codeGenerator', nullable: true })
//   @OneToOne({ nullable: true })
//   public codeGenerator?: CodeGenerator;
// }

// /*

// // Item to Fleet relationship resolvers
// // Item.fleet is null when created, e.g. it is NOT assigned to any fleet.
// // Resolver 1: Assign single Item to Fleet.  (Item, Fleet) => () {} // create event "Item Assigned to Fleet"
// // Resolver 2: Assign all Items of a Batch to Fleet.(Batch, Fleet) => () // create event "Batch Assigned to Fleet"
// // Resolver 3: Remove single Item to Fleet.  (Item, Fleet) => () {} // create event "Item Removed to Fleet"
// // Resolver 4: Remove all Items of a Batch from Fleet.  (Batch, Fleet) => () {} // create event "Batch Removed to Fleet"

// */
