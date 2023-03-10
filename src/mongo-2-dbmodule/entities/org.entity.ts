import { Column, ObjectID } from 'typeorm';
import { Field, InterfaceType, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { Person } from './person.entity';

@InterfaceType()
@ObjectType()
export abstract class Org extends BaseEntity {
  @Field()
  @Column({ default: 'OVES Distributor' })
  public name: string;

  @Field({ nullable: true })
  @Column({
    default: 'Standard PAYG Distribution Established in 2021',
    nullable: true,
  })
  public description: string;

  @Field((type) => Person, { nullable: true })
  @Column({ type: 'string', nullable: true })
  public orgContactPerson: ObjectID;

  @Column({ name: 'contact_role', nullable: true })
  public contactRole: string; // e.g. CEO
}
