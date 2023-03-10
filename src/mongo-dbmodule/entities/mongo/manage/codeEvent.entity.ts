import { Entity, Column, ManyToOne, Index, ObjectID } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CodeTypes } from 'src/postgres-module/enums/code-types.enum';
import { Actor } from '../actor.entity';
import { CodeGenerator } from './codeGen.entity';
@ObjectType()
@Entity('codeevent')
@Index(
  'idx_codeevent_fulltext',
  [
    'codeType',
    'codeHexString',
    'codeDecString',
    'description',
    'triggers',
    'type',
    'actionScope',
    'actorName',
    'profile',
  ],
  { fulltext: true },
)
export class CodeEvent extends Actor {
  // @PrimaryGeneratedColumn('uuid')
  // public id!: string;

  @Field((type) => CodeTypes)
  @Column({ type: 'enum', enum: CodeTypes })
  public codeType: CodeTypes;

  @Field((type) => Int)
  @Column({ type: 'integer' })
  public codeDays: number;

  @Field((type) => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  public codeNumber: number;

  @Field((type) => CodeGenerator, { name: 'codeGenerator' })
  @Column({ type: 'string', nullable: true })
  codeGenerator?: ObjectID;

  @Field()
  @Column({ type: 'varchar' })
  public codeHexString: string;

  @Field()
  @Column({ type: 'varchar' })
  public codeDecString: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  public description?: string;
}

// import {
//   Entity,
//   EntityRepositoryType,
//   Enum,
//   Index,
//   ManyToOne,
//   Property,
// } from '@mikro-orm/core';
// import { Field, Int, ObjectType } from '@nestjs/graphql';
// import { CodeTypes } from 'src/postgres-module/enums/code-types.enum';
// import { CodeEventRepository } from 'src/postgres-module/repositories/codeevent.repository';
// import { Actor } from 'src/postgres-module/entities/actor.entity';
// import { CodeGenerator } from 'src/postgres-module/entities/manage/codegen.entity';

// @ObjectType()
// @Entity({ tableName: 'codeevent', customRepository: () => CodeEventRepository })
// @Index({
//   properties: [
//     'codeType',
//     'codeHexString',
//     'codeDecString',
//     'description',
//     'triggers',
//     'type',
//     'actionScope',
//     'actorName',
//     'profile',
//   ],
//   type: 'text',
// })
// export class CodeEvent extends Actor {
//   [EntityRepositoryType]?: CodeEventRepository;

//   // @Field(() => ID)
//   // @PrimaryKey()
//   // public _id!: ObjectId

//   @Field((type) => CodeTypes)
//   @Enum({ items: () => CodeTypes })
//   public codeType: CodeTypes;

//   // A positive integer with value between 1 to 2195
//   // use special numeric values to denote FREE and RESET codes
//   // FREECODE => {codeDays=0}
//   // RESETCODE => {codeDays=0}
//   @Field((type) => Int)
//   @Property()
//   public codeDays: number;

//   // Capture this value from the state of the generator codeNumber = CodeGenerator.codeCount
//   @Field((type) => Int, { nullable: true })
//   @Property()
//   public codeNumber: number;

//   @Field((type) => CodeGenerator, { name: 'codeGenerator' })
//   @ManyToOne({ entity: () => CodeGenerator })
//   codeGenerator!: CodeGenerator; // generator is annullable!

//   // code in 32 bit hex format "ACCD1234ABCE1234"
//   // This code is equivalent to codeDecString
//   // !Resolver: Calculate this field with:
//   // OTP_hex(hashTop, hashIndex, Jump), where Jump = Days | FreeCodeJump | ResetCodeJump
//   @Field()
//   @Property()
//   public codeHexString: string;

//   // code in decimal format "*123 456 789 098 654 210 123#"
//   // This field is calculated with the function codeDecString = dec_str_padding_low_high (codeHexString)
//   // The decimal-padded form of code is normally send to the end-user for code entry.
//   // Most current firmware versions also accepts (only) codeDecString as inputs
//   @Field()
//   @Property()
//   public codeDecString: string;

//   // description of the code event
//   // A good case is the a copy or excerpt of the message send to the end-user "A 5 day credit token o=is generated..."
//   @Field({ nullable: true })
//   @Property({ nullable: true })
//   public description?: string;
// }
