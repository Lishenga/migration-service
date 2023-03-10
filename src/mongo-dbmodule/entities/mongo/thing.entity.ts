import { Entity, Column } from 'typeorm';
import { Field, InterfaceType } from '@nestjs/graphql';
import { ThingIDTypes } from 'src/postgres-module/enums/thing-id-types.enum';
import { Actor } from './actor.entity';

@InterfaceType()
@Entity()
export abstract class Thing extends Actor {
  @Field((type) => ThingIDTypes)
  @Column({
    type: 'enum',
    enum: ThingIDTypes,
    default: ThingIDTypes.UUID,
  })
  public idType: ThingIDTypes;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public idString?: string;

  @Field()
  @Column({ default: 'OVES Connected eIoT' })
  public description: string;

  @Field((type) => Date)
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  public creationDate: Date;
}

// import { Enum, Property } from '@mikro-orm/core';
// import { Field, InterfaceType } from '@nestjs/graphql';
// import { ThingIDTypes } from 'src/postgres-module/enums/thing-id-types.enum';
// import { Actor } from 'src/postgres-module/entities/actor.entity';

// // The Thing class is a contract of all necessary common fields
// // by all its implementing sub-classes
// // @ObjectType({ implements: [Actor, BaseEntity] })
// @InterfaceType()
// export abstract class Thing extends Actor {
//   @Field((type) => ThingIDTypes)
//   @Enum({ items: () => ThingIDTypes, default: ThingIDTypes.UUID })
//   public idType: ThingIDTypes;

//   @Field({ nullable: true })
//   @Property({ nullable: true })
//   public idString?: string;

//   @Field()
//   @Property({ default: 'OVES Connected eIoT' })
//   public description: string;

//   @Field((type) => Date)
//   @Property({ onCreate: () => new Date() })
//   public creationDate: Date;
// }
