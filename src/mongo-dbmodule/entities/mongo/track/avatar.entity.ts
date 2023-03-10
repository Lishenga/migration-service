import { Column, Entity, Index, OneToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Actor } from '../actor.entity';
import { Item } from '../make/item.entity';
import { Attribute } from './generic-attribute-profile.entity';

@ObjectType()
@Entity({ name: 'avatar' })
@Index([
  'lastSync',
  'lastPub',
  'lastSub',
  'att',
  'sts',
  'cmd',
  'dia',
  'dta',
  'triggers',
  'type',
  'actionScope',
  'actorName',
  'profile',
])
export class Avatar extends Actor {
  @Field((type) => Item, { name: 'item' })
  @OneToOne((type) => Item)
  public shadow: Item;

  @Field((type) => Boolean, {
    defaultValue: false,
    description: 'Status of item online status',
  })
  @Column({ default: false })
  public itemAlive: boolean;

  @Field()
  @Column({ type: 'timestamp' })
  public lastSync: Date;

  @Field()
  @Column()
  public lastPub: string;

  @Field()
  @Column()
  public lastSub: string;

  @Field((type) => [Attribute], { nullable: true })
  @Column({ nullable: true, type: 'json' })
  public att?: Attribute[];

  @Field((type) => [Attribute], { nullable: true })
  @Column({ nullable: true, type: 'json' })
  public sts?: Attribute[];

  @Field((type) => [Attribute], { nullable: true })
  @Column({ nullable: true, type: 'json' })
  public cmd?: Attribute[];

  @Field((type) => [Attribute], { nullable: true })
  @Column({ nullable: true, type: 'json' })
  public dta?: Attribute[];

  @Field((type) => [Attribute], { nullable: true })
  @Column({ nullable: true, type: 'json' })
  public dia?: Attribute[];
}

// import {
//   Entity,
//   EntityRepositoryType,
//   Index,
//   OneToOne,
//   Property,
// } from '@mikro-orm/core';
// import { Field, ObjectType } from '@nestjs/graphql';
// import { AvatarRepository } from 'src/postgres-module/repositories/avatar.repository';
// import { Actor } from '../actor.entity';
// import { Item } from '../make/item.entity';
// import { Attribute } from './generic-attribute-profile.entity';

// // An Avatar is an online shadow of a thing.
// // Shadow is a good way to maintain states of things, while the physical thing might not always be online.
// @ObjectType()
// @Entity({ tableName: 'avatar', customRepository: () => AvatarRepository })
// @Index({
//   properties: [
//     'lastSync',
//     'lastPub',
//     'lastSub',
//     'att',
//     'sts',
//     'cmd',
//     'dia',
//     'dta',
//     'triggers',
//     'type',
//     'actionScope',
//     'actorName',
//     'profile',
//   ],
//   type: 'text',
// })
// export class Avatar extends Actor {
//   [EntityRepositoryType]?: AvatarRepository;

//   // An avatar always maps to a specific item
//   // But not all items have avatars!
//   // @Field()
//   // @Property()
//   @Field((type) => Item, { name: 'item' })
//   @OneToOne()
//   public shadow: Item;

//   // is the item that this avatar shadows for still alive?
//   @Field((type) => Boolean, {
//     defaultValue: false,
//     description: 'Status of item online status',
//   })
//   @Property({ default: false })
//   public itemAlive: boolean;

//   @Field()
//   @Property()
//   public lastSync: Date;

//   // last messages published.  MQTT format with topic/payload
//   @Field()
//   @Property()
//   public lastPub: string;

//   // last messages received via subscription.  MQTT format with topic/payload
//   @Field()
//   @Property()
//   public lastSub: string;

//   // state representation of thing!
//   // Common GATT JSON payload sections
//   // att: basic attribute data, normally do not change.  All items have these
//   // sts: discrete states.  All items have these properties
//   // cmd: command received.  All items have these
//   // Item type specific GAPP payload sections
//   // dta: data metrics of this item type
//   // dia: diagnostic metrics of this item type
//   @Field((type) => [Attribute], { nullable: true })
//   @Property({ nullable: true })
//   public att?: Attribute[];

//   @Field((type) => [Attribute], { nullable: true })
//   @Property({ nullable: true })
//   public sts?: Attribute[];

//   @Field((type) => [Attribute], { nullable: true })
//   @Property({ nullable: true })
//   public cmd?: Attribute[];

//   @Field((type) => [Attribute], { nullable: true })
//   @Property({ nullable: true })
//   public dta?: Attribute[];

//   @Field((type) => [Attribute], { nullable: true })
//   @Property({ nullable: true })
//   public dia?: Attribute[];
// }

// /*

// // Item to Avatar to Item relationship resolvers
// // Avatar.creation should fail the shadow (Item) has already been bond to another Avatar object!

// // Resolver 1: Activate an Avatar () =>
// // {
// //    1: subscribe to MQTT topic containing thing's UUID = shadow.idString
// //    2: Set itemAlive = true
// // }

// // Resolver 2: Deactivate an Avatar () =>
// // {
// //    1: un-subscribe to MQTT topics containing thing's UUID = shadow.idString
// //    2: Set itemAlive = false
// // }

// // Resolver 3: Update by MQTT event being subscribed to by this Avatar () =>
// // {
// //  1: store the entire message payload to lastSub.  Parse this lastSub and do below according to update type
// //  2.1: Update att
// //      if a "prop" already exists in att, then replace the value.  Otherwise insert a new record, e.g. {prop: "paygProductID", value: "ovPump1900000300"},
// //  2.2: Update sts
// //       if a "prop" already exists in sts, then replace the value.  Otherwise insert a new record, e.g. {prop: "paygS", value: "PAYG"},
// //  2.3: Update sta
// //      if a "prop" already exists in sta, then replace the value.  Otherwise insert a new record, e.g. {prop: "mFrq", value: "500hz"}
// //  3: Set lastSync = DateStamp

// // }

// */
