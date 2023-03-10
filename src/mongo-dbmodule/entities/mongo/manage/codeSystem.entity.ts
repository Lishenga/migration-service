import { Column, Entity, Index, Unique } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CodeSystemType } from 'src/postgres-module/enums/code-system-type.enum';
import { CodeTypes } from 'src/postgres-module/enums/code-types.enum';
import { BaseEntity } from '../base.entity';

@ObjectType()
@Entity({ name: 'codeSystems' })
@Unique(['system'])
@Index('ix_system_code_range', ['system', 'codeRange'])
export class CodeSystem extends BaseEntity {
  @Field((type) => CodeSystemType, {
    description: 'Code system.  Current systems are ACP1 and ACP2.',
  })
  @Column({
    type: 'enum',
    enum: CodeSystemType,
    default: CodeSystemType.ACP2,
  })
  public system: CodeSystemType;

  @Field((type) => Int, {
    description: 'Default code systems is ACP1, with hashChainLength = 100000.',
  })
  @Column({ default: 100000 })
  public hashChainLength: number;

  @Field((type) => Int, {
    description: 'Default code systems is ACP2, with hashMaxJump = 1095.',
  })
  @Column({ default: 1095 })
  public hashMaxJump: number;

  @Field((type) => Int, {
    description: 'Default code systems is ACP2, with freeCodeJump = 1096.',
  })
  @Column({ default: 1096 })
  public freeCodeJump: number;

  @Field((type) => Int, {
    description: 'Default code systems is ACP2, with resetCodeJump = 2192.',
  })
  @Column({ default: 2192 })
  public resetCodeJump: number;

  @Field((type) => [CodeTypes], {
    defaultValue: [CodeTypes.DAYSCODE, CodeTypes.FREECODE, CodeTypes.RESETCODE],
    description:
      'Default code systems is ACP1. Codes available for ACP1 = [CodeTypes.DAYSCODE, CodeTypes.FREECODE, CodeTypes.RESETCODE]',
  })
  @Column({
    type: 'enum',
    enum: CodeTypes,
    array: true,
    default: [CodeTypes.DAYSCODE, CodeTypes.FREECODE, CodeTypes.RESETCODE],
  })
  public codeRange: CodeTypes[];
}

// import {
//   Entity,
//   EntityRepositoryType,
//   Enum,
//   Index,
//   Property,
//   Unique,
// } from '@mikro-orm/core';
// import { Field, Int, ObjectType } from '@nestjs/graphql';
// import { CodeSystemType } from 'src/postgres-module/enums/code-system-type.enum';
// import { CodeTypes } from 'src/postgres-module/enums/code-types.enum';
// import { CodeSystemRepository } from 'src/postgres-module/repositories/codesystem.repository';
// import { BaseEntity } from 'src/postgres-module/entities/base.entity';

// // How do we make this object immutable???
// @ObjectType()
// @Entity({
//   tableName: 'codeSystems',
//   customRepository: () => CodeSystemRepository,
// })
// @Unique({ properties: ['system'] }) // Only one system type is allowed for each code type!
// @Index({ properties: ['system', 'codeRange'], type: 'text' })
// export class CodeSystem extends BaseEntity {
//   [EntityRepositoryType]?: CodeSystemRepository;

//   // @Field(type => String)
//   // @Field({ default: CodeSystemType.ACP1 })
//   @Field((type) => CodeSystemType, {
//     description: 'Code system.  Current systems are ACP1 and ACP2.',
//   })
//   @Enum({ type: () => CodeSystemType, default: CodeSystemType.ACP2 })
//   public system: CodeSystemType;
//   // public system: string = CodeSystemType.ACP2;

//   // The length of hashChain.  Used this to initialize the codeGenrator
//   // @Field(type => Int)
//   @Field((type) => Int, {
//     description: 'Default code systems is ACP1, with hashChainLength = 100000.',
//   })
//   @Property({ default: 100000 })
//   public hashChainLength: number;
//   // public hashChainLength: number = 100000;

//   // This is a algorithm specific value
//   // Used for determining if a hashJump is out of bound
//   // @Field(type => Int)
//   @Field((type) => Int, {
//     description: 'Default code systems is ACP2, with hashMaxJump = 1095.',
//   })
//   @Property({ default: 1095 })
//   public hashMaxJump: number;
//   // hashMaxJump: number = freeCodeJump-1 = 1095;

//   // freeCode uses hashMaxJump as input
//   // @Field()
//   @Field((type) => Int, {
//     description: 'Default code systems is ACP2, with freeCodeJump = 1096.',
//   })
//   @Property({ default: 1096 })
//   public freeCodeJump: number;
//   // public freeCodeJump: number = 1096;

//   // resetCode uses 2 * hashMaxJump as input
//   // @Field()
//   @Field((type) => Int, {
//     description: 'Default code systems is ACP2, with freeCodeJump = 2192.',
//   })
//   @Property({ default: 2192 })
//   public resetCodeJump: number;
//   // public resetCodeJump: number = 2192;

//   // @Field()
//   @Field((type) => [CodeTypes], {
//     defaultValue: [CodeTypes.DAYSCODE, CodeTypes.FREECODE, CodeTypes.RESETCODE],
//     description:
//       'Default code systems is ACP1. Codes available for ACP1 = [CodeTypes.DAYSCODE, CodeTypes.FREECODE, CodeTypes.RESETCODE]',
//   })
//   @Enum({
//     type: () => CodeTypes,
//     default: [CodeTypes.DAYSCODE, CodeTypes.FREECODE, CodeTypes.RESETCODE],
//     array: true,
//   })
//   public codeRange: CodeTypes[] = [
//     CodeTypes.DAYSCODE,
//     CodeTypes.FREECODE,
//     CodeTypes.RESETCODE,
//   ];
// }

// // @ObjectType()
// // export abstract class ACP1 {

// //     @Field(type => Int)
// //     public system: string = "ACP-1";

// //     // The length of hashChain.  Used this to initialize the codeGenrator
// //     @Field(type => Int)
// //     public hashChainLength: number = 100000;

// //     // This is a algorithm specific value
// //     // Used for determining if a hashJump is out of bound
// //     @Field(type => Int)
// //     hashMaxJump: number = 1096;

// //     // freeCode uses hashMaxJump as input
// //     @Field(type => Int)
// //     public freeCodeJump: number = 1096;

// //     // resetCode uses 2 * hashMaxJump as input
// //     @Field(type => Int)
// //     public resetCodeJump: number = 2 * 1096;

// //     @Field(type => [CodeTypes])
// //     public codeRange: CodeTypes[] = [
// //         CodeTypes.DAYSCODE,
// //         CodeTypes.FREECODE,
// //         CodeTypes.RESETCODE
// //         ];
// // }

// // @ObjectType()
// // export abstract class ACP2 {

// //     @Field(type => Int)
// //     public system: string = "ACP-2";

// //     @Field(type => Int)
// //     public hashChainLength: number = 200000;

// //     @Field(type => Int)
// //     public hashMaxJump: number = 2 * 1096; /* = 2 * 1096 */

// //     // freeCode uses hashMaxJump as input
// //     @Field(type => Int)
// //     public freeCodeJump: number = 2 * 1096;

// //     // resetCode uses 2 * hashMaxJump as input
// //     @Field(type => Int)
// //     public resetCodeJump: number = 3 * 1096;

// //     @Field(type => [CodeTypes])
// //     public codeRange: CodeTypes[] = [
// //         CodeTypes.DAYSCODE,
// //         CodeTypes.FREECODE,
// //         CodeTypes.RESETCODE,
// //         CodeTypes.SYNCCODE
// //         ];
// // }
