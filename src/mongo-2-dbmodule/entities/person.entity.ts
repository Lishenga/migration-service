import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType, Directive } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { Contact } from './contact.entity';

@ObjectType()
@Directive('@key(fields: "_id")')
@Entity({ name: 'person' })
export class Person extends BaseEntity {
  @Column()
  @Field()
  public name!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  public description: string;

  @Column({ nullable: true })
  @Field((type) => Contact)
  public contact!: Contact;
}
