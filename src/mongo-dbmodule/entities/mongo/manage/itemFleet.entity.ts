import { Entity, Index, OneToMany, Unique, Column, ObjectID } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Actor } from '../actor.entity';
import { Item } from '../make/item.entity';

@ObjectType()
@Entity('itemFleet')
@Unique(['fleetName'])
@Index('fleetName', ['distributor', 'fleetName'])
@Index(
  'text_index',
  [
    'fleetName',
    'assignDate',
    'description',
    'triggers',
    'type',
    'actionScope',
    'actorName',
    'profile',
  ],
  { fulltext: true },
)
export class ItemFleet extends Actor {
  @Field()
  @Column()
  public fleetName: string;

  @Field((type) => Date)
  @Column()
  public assignDate: Date;

  @Field()
  @Column()
  public description: string;

  @Field((type) => [Item], { name: 'itemList', nullable: true })
  @OneToMany((type) => Item, (item) => item.fleet)
  itemList: Item[];

  @Column({ type: 'string', nullable: true })
  distributor?: ObjectID;
}

// import {
//   Collection,
//   Entity,
//   EntityRepositoryType,
//   Index,
//   OneToMany,
//   Property,
//   Unique,
// } from '@mikro-orm/core';
// import { Directive, Field, ObjectType } from '@nestjs/graphql';
// import { ObjectId } from 'bson';
// import { Distributor } from 'src/postgres-module/federation/entities/distributor.reference';
// import { ItemFleetRepository } from 'src/postgres-module/repositories/itemfleet.repository';
// import { Actor } from 'src/postgres-module/entities/actor.entity';
// import { Item } from 'src/postgres-module/entities/make/item.entity';

// // A Fleet is a collection of Items that under one management, e.g a distributor or paygo company
// // Similar to the legacy "assignedItems"
// // At any tome, an Item can only be linked to one Fleet.  Default is ovUnassignedFleet when the iItem is not given to any specific operator
// // This is an interface object to the Organization services.  Fleet is an ownership concept.  A fleet must belong to an organization

// // Create a default ovesFleet as a place holder for all unassigned items?  Or a null fleet indicated oves ownership?
// @ObjectType()
// @Directive('@key(fields: "_id")')
// @Entity({ tableName: 'itemFleet', customRepository: () => ItemFleetRepository })
// @Index({ name: 'fleetName', properties: ['distributor', 'fleetName'] }) // simple index, with custom name
// @Unique({ properties: ['fleetName'] })
// @Index({
//   properties: [
//     'fleetName',
//     'assignDate',
//     'description',
//     'triggers',
//     'type',
//     'actionScope',
//     'actorName',
//     'profile',
//   ],
//   type: 'text',
// })
// export class ItemFleet extends Actor {
//   [EntityRepositoryType]?: ItemFleetRepository;

//   // fleetID is expected to point to an organization manager from the org-services.
//   // The assigned organization will have access to the items included in itemList
//   // access control logic will be enforced by this "right to manage" logic

//   // @Field()
//   // @Property()
//   // public managerName: string;

//   @Field()
//   @Property()
//   public fleetName: string;

//   // Date and time of fleet assignment
//   @Field((type) => Date)
//   @Property()
//   public assignDate: Date;

//   // Descriptive notes about a fleet assignment
//   @Field()
//   @Property()
//   public description: string;

//   @Field((type) => [Item], { name: 'itemList', nullable: true })
//   @OneToMany(() => Item, (item) => item.fleet)
//   itemList = new Collection<Item>(this);

//   @Field((type) => Distributor, { nullable: true })
//   @Property({ nullable: true })
//   distributor?: ObjectId;
// }

// /*

// // Fleet to Distributor relationship resolvers
// // Fleet.distributor is null when created, e.g. it is NOT assigned to any manager.
// // Resolver 1: Assign Fleet to Distributor.  (Fleet, Distributor) => ()
// // {
// //      1: Insert Fleet to Distributor.Fleets[Fleet];
// //      2: update managerName = Distributor.name
// //      3: create event "Fleet xxx Assigned to Distributor YYY"
// // }
// // Resolver 2: Remove Fleet Item to Distributor.  (Item, Fleet) => ()
// // {
// //      1: Search if Fleet is in Distributor.Fleets[Fleet];
// //      2: update managerName = "Unassigned"
// //      3: create event "Fleet xxx Removed to Distributor YYY"
// // }

// */
