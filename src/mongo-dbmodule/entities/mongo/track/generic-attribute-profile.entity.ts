import { Entity, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

// An attribute itself is not a object, but used s embedded into GATT
@ObjectType()
export abstract class Attribute {
  // This is a short label for the property，suitable for transmitting and print.
  // "Weight", "Length", "Rated Power"
  @Field()
  @Column()
  prop: string;

  // use a generic format of string that contain both value and a unit suffix, e.g.
  // "3.5kg", "1.25mm", "5kW"
  @Field()
  @Column()
  value: string;

  // This is a more readable explanation of this attribute
  // "This is the gross weight in Kg"
  @Field()
  @Column()
  meta: string;
}

// The Thing class is a contract of all necessary common fields
// by all its implementing sub-classes
// @ObjectType({ implements: [Actor, BaseEntity] })
@ObjectType()
export abstract class GATT {
  // A aggregate description of the collection of attributes
  // E.g. "Property of a OVES 24in DC TV Model XXXX"
  @Field()
  @Column()
  public name: string;

  @Field((type) => [Attribute], { nullable: true })
  @Column('jsonb', { nullable: true })
  public attributes?: Attribute[];

  // How to implement something more cp,pact like this:?
  // [
  //     ["_prop:",  "_value:"],
  //     ["weight",  "170lb"],
  //     ["height", "1.5m"]
  // ]
  // Possible like this?
  // public attributes!: string[][]
}

// import { Property, Embedded, Embeddable } from '@mikro-orm/core';
// import { Field, ObjectType } from '@nestjs/graphql';

// // An attribute itself is not a object, but used s embedded into GATT
// @Embeddable()
// @ObjectType()
// export abstract class Attribute {
//   // This is a short label for the property，suitable for transmitting and print.
//   // "Weight", "Length", "Rated Power"
//   @Field()
//   @Property()
//   prop: string;

//   // use a generic format of string that contain both value and a unit suffix, e.g.
//   // "3.5kg", "1.25mm", "5kW"
//   @Field()
//   @Property()
//   value: string;

//   // This is a more readable explanation of this attribute
//   // "This is the gross weight in Kg"
//   @Field()
//   @Property()
//   meta: string;
// }

// // The Thing class is a contract of all necessary common fields
// // by all its implementing sub-classes
// // @ObjectType({ implements: [Actor, BaseEntity] })
// @Embeddable()
// @ObjectType()
// export abstract class GATT {
//   // A aggregate description of the collection of attributes
//   // E.g. "Property of a OVES 24in DC TV Model XXXX"
//   @Field()
//   @Property()
//   public name: string;

//   // props is an array of attributes:
//   // [
//   //     {prop: "weight", value: "170lb"},
//   //     {prop: "height", value: "1.5m"}
//   // ]
//   // @Field(type => [Attribute],{nullable: true})
//   // @Property()
//   // public props?: Attribute[];
//   @Field((type) => [Attribute], { nullable: true })
//   // @Property()
//   @Embedded(() => Attribute, { array: true, nullable: true })
//   public attributes?: Attribute[];

//   // How to implement something more cp,pact like this:?
//   // [
//   //     ["_prop:",  "_value:"],
//   //     ["weight",  "170lb"],
//   //     ["height", "1.5m"]
//   // ]
//   // Possible like this?
//   // public attributes!: string[][]
// }
