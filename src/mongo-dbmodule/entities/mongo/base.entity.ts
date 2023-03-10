import { Field, ID, InterfaceType, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectID } from 'mongodb';

@InterfaceType()
@ObjectType()
export abstract class BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id = new ObjectID();

  @Field((type) => Boolean, { nullable: true })
  @Column({ default: false, nullable: true })
  public deleteStatus?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public deleteAt?: Date;

  @Field({ nullable: true })
  @CreateDateColumn()
  public createdAt?: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  public updatedAt?: Date;
}

// import { Field, ID, InterfaceType } from '@nestjs/graphql';
// import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
// import { ObjectId } from '@mikro-orm/mongodb';

// @InterfaceType()
// @Entity({
//   abstract: true,
// })
// export abstract class BaseEntity {
//   @Field(() => ID)
//   @PrimaryKey()
//   public _id!: ObjectId;

//   @Field((type) => Boolean, { nullable: true })
//   @Property({ default: false })
//   public deleteStatus: boolean;

//   @Field({ nullable: true })
//   @Property({ nullable: true })
//   public deleteAt: Date;

//   @Field({ nullable: true })
//   @Property({ onCreate: () => new Date() })
//   public createdAt: Date;

//   @Field({ nullable: true })
//   @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
//   public updatedAt: Date;
// }
