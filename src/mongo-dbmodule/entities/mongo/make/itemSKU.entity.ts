import { Column, Entity, Index, Unique } from 'typeorm';
import { Actor } from '../actor.entity';
import { GATT } from '../track/generic-attribute-profile.entity';

@Entity({ name: 'itemsku' })
@Unique(['skuName'])
@Index(['skuName', 'productBase', 'oemDescription', 'type'])
export class ItemSKU extends Actor {
  // this is a description name, used by production and inventory and order forms
  // typical SKU name contains information about a product,
  // but also includes other information for production and inventory management purposes
  @Column()
  public skuName!: string;

  // @Field(type =>ProductClassBases)
  // @Enum({ items: ()=> ProductClassBases, default: ProductClassBases.MISC })
  @Column({ nullable: true })
  public productBase!: string;

  // an URL pointing to a main representative image file
  // can be empty!
  @Column({ nullable: true })
  public mainMediaURL!: string;

  // This is the set of properties that describe the SKU in some detail
  @Column({ type: 'json', nullable: true })
  public properties?: GATT;

  // OEM may choose to give a descriptive name to this SKU
  // can be empty!
  @Column({ nullable: true })
  public oemDescription?: string;

  // @Column({ nullable: true })
  // public distributor?: ObjectID;

  // @Column({ nullable: true })
  // public supplier?: ObjectID;
}

// import {
//   Entity,
//   Property,
//   EntityRepositoryType,
//   Unique,
//   Index,
//   Filter,
//   Embedded,
// } from '@mikro-orm/core';
// import { Directive, Field, ObjectType } from '@nestjs/graphql';
// import { ObjectId } from 'bson';
// import { Distributor } from 'src/postgres-module/federation/entities/distributor.reference';
// // import { MediaMeta } from 'src/postgres-module/federation/entities/mediameta.reference';
// import { Supplier } from 'src/postgres-module/federation/entities/supplier.reference';
// import { ItemSKURepository } from 'src/postgres-module/repositories/itemsku.repository';
// import { Actor } from '../actor.entity';
// import { GATT } from '../track/generic-attribute-profile.entity';

// // SKU = stock keeping unit
// // This is a unique identifier for a specific type of products
// // every item must be assigned an SKU
// // But NOT every SKU is currently in production, so may not have any items using it

// // @Unique usage!!!
// // This decorator allows you to create a database unique constraint for a specific column or columns.
// // This decorator can be applied only to an entity itself.
// // You must specify the entity field names (not database column names) as arguments.
// // @Unique(["firstName"])
// // @Unique(["lastName", "middleName"])
// // @Unique("UQ_NAMES", ["firstName", "lastName", "middleName"])
// @ObjectType()
// @Directive('@key(fields: "_id")')
// @Entity({ tableName: 'itemsku', customRepository: () => ItemSKURepository })
// // @Index({ name: 'skuName', properties: ['skuName'] }) // simple index, with custom name
// @Unique({ properties: ['skuName'] })
// @Filter({
//   name: 'findSkuNumber',
//   cond: (args) => ({ skuName: { name: args.skuName } }),
// })
// @Index({
//   properties: [
//     'skuName',
//     'productBase',
//     'properties',
//     'oemDescription',
//     'triggers',
//     'type',
//     'actionScope',
//     'actorName',
//     'profile',
//   ],
//   type: 'text',
// })
// export class ItemSKU extends Actor {
//   [EntityRepositoryType]?: ItemSKURepository;

//   // this is a description name, used by production and inventory and order forms
//   // typical SKU name contains information about a product,
//   // but also includes other information for production and inventory management purposes
//   @Field()
//   @Property()
//   public skuName: string;

//   // @Field(type =>ProductClassBases)
//   // @Enum({ items: ()=> ProductClassBases, default: ProductClassBases.MISC })
//   @Property()
//   @Field({
//     description:
//       'Product Base are 4-letter string constant defined by OVES Production.',
//     nullable: true,
//   })
//   public productBase!: string;

//   // an URL pointing to a main representative image file
//   // can be empty!
//   @Field((type) => String, { name: 'mainMediaURL', nullable: true })
//   // @ManyToOne({ mapToPk: true })
//   @Property()
//   public mainMediaURL: ObjectId;

//   // This is the set of properties that describe the SKU in some detail
//   @Field((type) => GATT, { nullable: true })
//   @Embedded(() => GATT, { object: true, nullable: true })
//   public properties?: GATT;

//   // OEM may choose to give a descriptive name to this SKU
//   // can be empty!
//   @Field({ nullable: true })
//   @Property({ nullable: true })
//   public oemDescription?: string;

//   @Field((type) => Distributor, { nullable: true })
//   @Property({ nullable: true })
//   distributor?: Distributor;

//   @Field((type) => Supplier, { nullable: true })
//   @Property({ nullable: true })
//   supplier?: Supplier;

//   // base costs in US$.  Can be null
//   // Removed from here.  Instead, baseCost is captured among GATT attributes, and handled at Article level
//   // @Field(type=>Float)
//   // @Property()
//   // public baseCosts?: number;
// }

// /*

// // Methods for the field "properties", which is a GATT table
// // Property reference is done via the "prop" field, a string
// // Separate static table will be created for restricting legal "prop" properties, e.g. "Input Voltage", "Rated Power" etc.
// // Create an initial GATT place holder (gattname: string)) => {GATT.name = gattname}
// // Add Property (property: Attribute(prop, value, meta: string)) => {
//   if prop NOT already existing, then append the new property to array attributes!: Attribute[];
//   if the prop already exists, the flag error
// }
// // Update Property (property: Attribute(prop, value, meta: string)) => {
//   if prop IS already existing, then replace the matched property to array attributes!: Attribute[];
//   if the prop already exists, the flag error
// }
// // Delete Property (prop: string)) =>: allow if prop exists in attributes

// */
