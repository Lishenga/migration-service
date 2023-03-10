import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

// An contact is an information unit embedded in any class
// requiring contact services such as phone or email
// It is an abstract class with "object" instantiation
@ObjectType()
@Entity()
export abstract class Contact {
  // This is the lowest level of detail, e.g. a house number, building, apartment etc.
  @Field()
  @Column()
  public phone: string;

  @Field()
  @Column()
  public email: string;

  @Field()
  @Column()
  public social: string;
}
