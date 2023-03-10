import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { ItemStock } from './itemStock.entity';

@ObjectType({ implements: [BaseEntity] })
@Entity({ name: 'shipment' })
@Index(['shipmentName'], { fulltext: true })
export class Shipment extends BaseEntity {
  @Field()
  @Index('shipmentName_text_index')
  shipmentName: string;

  @Field((type) => [ItemStock])
  @ManyToMany((type) => ItemStock, { eager: true })
  @JoinTable()
  manifest: ItemStock[];
}

// import {
//   Collection,
//   Entity,
//   EntityRepositoryType,
//   Index,
//   ManyToMany,
//   Property,
// } from '@mikro-orm/core';
// import { Directive, Field, ObjectType } from '@nestjs/graphql';
// // import { Address } from "src/postgres-module/federation/entities/address.reference";
// import { ShipmentRepository } from 'src/postgres-module/repositories/shipment.repository';
// import { BaseEntity } from 'src/postgres-module/entities/base.entity';
// import { ItemStock } from 'src/postgres-module/entities/make/itemstock.entity';

// // A shipment is a collection of multiple ItemStocks
// // In this sense each ItemStock is a line number on the manifest, and it is a transient stock
// @ObjectType({ implements: [BaseEntity] })
// @Directive('@key(fields: "_id")')
// @Entity({ tableName: 'shipment', customRepository: () => ShipmentRepository })
// @Index({ name: 'shipmentName', properties: ['shipmentName'] }) // simple index, with custom name
// // @Unique({ properties: ['shipmentName'] })
// @Index({ properties: ['shipmentName'], type: 'text' })
// // Filter search by shipment??
// export class Shipment extends BaseEntity {
//   [EntityRepositoryType]?: ShipmentRepository;

//   @Field()
//   @Property({ default: 'STANDARD SHIPMENT' })
//   // creationDate is the physical creation.  This is different from the BaseEntity createAt
//   public shipmentName: string;

//   @Field((type) => [ItemStock])
//   @ManyToMany({ entity: () => ItemStock })
//   public manifest = new Collection<ItemStock>(this);

//   // @Field({ nullable: true })
//   // @ManyToOne({ mapToPk: true, nullable: true })
//   // creationDate is the physical creation.  This is different from the BaseEntity createAt
//   // @ManyToOne({ entity: () => Address })
//   // public origin?: Address;

//   // @Field({ nullable: true })
//   // @Property()
//   // @Field((type) => Address)
//   // @Property()
//   // public origin?:Address;

//   // @Field({ nullable: true })
//   // @ManyToOne({ mapToPk: true, nullable: true })
//   // // creationDate is the physical creation.  This is different from the BaseEntity createAt
//   // @ManyToOne({ entity: () =>string })
//   // public destination?:string;

//   // @Field({ nullable: true })
//   // @Property()
//   // @Field((type) => Address)
//   // @Property()
//   // public destination?:Address;
// }
