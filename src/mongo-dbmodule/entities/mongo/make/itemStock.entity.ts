import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Item } from './item.entity';
import { ItemSKU } from './itemSKU.entity';

@ObjectType({ implements: [BaseEntity] })
@Entity({ name: 'itemStock' })
@Index('idx_item_stock_name_locator', ['stockName', 'locator'])
export class ItemStock extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  public stockName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public locator?: string;

  @Field((type) => Float, { nullable: true })
  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2 })
  public stockCosts?: number;

  @Field()
  @ManyToOne(() => ItemSKU, { eager: true })
  public batchSKU: ItemSKU;

  @Field((type) => Int, { nullable: true })
  @Column({ nullable: true })
  public quantity?: number;

  @Field((type) => [Item])
  @OneToMany(() => Item, (item) => item.stock)
  itemList: Item[];
}

// // Implementation types
// import {
//   Collection,
//   Entity,
//   EntityRepositoryType,
//   Index,
//   ManyToOne,
//   OneToMany,
//   Property,
//   Unique,
// } from '@mikro-orm/core';
// import { Field, ObjectType, Float, Int } from '@nestjs/graphql';
// import { ItemStockRepository } from 'src/postgres-module/repositories/itemstock.repository';
// import { BaseEntity } from 'src/postgres-module/entities/base.entity';
// import { Item } from 'src/postgres-module/entities/make/item.entity';
// import { ItemSKU } from 'src/postgres-module/entities/make/itemsku.entity';

// // SKU = stock keeping unit
// // itemStock is a specific manifestation of an SKU, usual a location, but can also be a virtual or transient
// // an itemStock can have these mutations:
// // receive(qty:INT): {quantity+=qty}.  send(qty:INT) {quantity-=qty}
// // revalue(newCost:Float){stockCosts = newCost}
// // A stock transfer operation from stock_1 to stock_2 involves a combined action of stock_1.send(qty) and stock_2.receive(qty)

// // A transient stock is a special kind of stock.  It is created by receive(), and destroyed by send().

// @ObjectType({ implements: [BaseEntity] })
// @Entity({ tableName: 'itemStock', customRepository: () => ItemStockRepository })
// // @Index({ name: 'stockName', properties: ['stockName'] }) // simple index, with custom name
// @Unique({ properties: ['stockName'] })
// @Index({ properties: ['stockName', 'locator'], type: 'text' })
// // Filter search by stock??
// export class ItemStock extends BaseEntity {
//   [EntityRepositoryType]?: ItemStockRepository;

//   @Field()
//   @Property()
//   // creationDate is the physical creation.  This is different from the BaseEntity createAt
//   public stockName: string;

//   // stock maker typically represent a location
//   @Field({ nullable: true })
//   @Property({ nullable: true })
//   public locator?: string;

//   // base costs in US$.  Can be null
//   @Field((type) => Float, { nullable: true })
//   @Property({ nullable: true })
//   public stockCosts?: number;

//   // Designated SKU: each stock must be built from or related to a specific SKU!
//   @Field()
//   @ManyToOne({ entity: () => ItemSKU, mapToPk: true })
//   public batchSKU!: ItemSKU;

//   // How many units are available for shipping out of stock
//   // Default quantity os zero.
//   @Field((type) => Int, { nullable: true })
//   @Property({ nullable: true })
//   public quantity?: number;

//   // There is a OneToMany relationship from ItemStock to Item
//   @Field((type) => [Item])
//   @OneToMany(() => Item, (item) => item.stock)
//   itemList = new Collection<Item>(this);
// }
