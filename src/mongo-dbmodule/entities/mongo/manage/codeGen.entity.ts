import { Entity, Column, OneToMany, ManyToOne, Index } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Actor } from '../actor.entity';
import { CodeEvent } from './codeEvent.entity';
import { CodeSystem } from './codeSystem.entity';

@ObjectType()
@Entity('codegenerator')
@Index([
  'hashRoot',
  'hashTop',
  'triggers',
  'type',
  'actionScope',
  'actorName',
  'profile',
])
export class CodeGenerator extends Actor {
  @Field(() => CodeSystem, { name: 'codeSystem' })
  @ManyToOne(() => CodeSystem)
  codeSystem: CodeSystem;

  @Field(() => Int, { name: 'freeCodeCount' })
  @Column({ default: 5 })
  freeCodeCount: number;

  @Field(() => String, { name: 'hashRoot' })
  @Column()
  hashRoot: string;

  @Field(() => String, { name: 'hashTop' })
  @Column()
  hashTop: string;

  @Field(() => Int, { name: 'codeCount' })
  @Column()
  codeCount: number;

  @Field(() => Int, { name: 'hashIndex' })
  @Column()
  hashIndex: number;

  @Field(() => Int, { name: 'codeReversalCount' })
  @Column()
  codeReversalCount: number;

  @OneToMany(() => CodeEvent, (codeEvent) => codeEvent.codeGenerator, {
    cascade: true,
  })
  codeHistory: CodeEvent[];
}

// import {
//   Entity,
//   OneToMany,
//   Collection,
//   Property,
//   QueryOrder,
//   EntityRepositoryType,
//   ManyToOne,
//   Index,
// } from '@mikro-orm/core';
// import { Field, Int, ObjectType } from '@nestjs/graphql';
// import { CodeSystem } from 'src/postgres-module/entities/manage/codesystem.entity';
// import { CodeEvent } from 'src/postgres-module/entities/manage/codeevent.entity';
// import { CodeGeneratorRepository } from 'src/postgres-module/repositories/codegenerator.repository';
// import { Actor } from 'src/postgres-module/entities/actor.entity';

// @ObjectType()
// @Entity({
//   tableName: 'codegenerator',
//   customRepository: () => CodeGeneratorRepository,
// })
// @Index({
//   properties: [
//     'hashRoot',
//     'hashTop',
//     'triggers',
//     'type',
//     'actionScope',
//     'actorName',
//     'profile',
//   ],
//   type: 'text',
// })
// export class CodeGenerator extends Actor {
//   [EntityRepositoryType]?: CodeGeneratorRepository;

//   // @Field(() => ID)
//   // @PrimaryKey()
//   // public _id!: ObjectId

//   // this is the unique Item that this generator is associated
//   // 1-to-1 relationship to Item, non-nullable on the Item side
//   // @Field(type => Item)
//   // @OneToOne({ mapToPk: true, persist: false })
//   // public bondItem: Item;

//   // !Resolver! CodeGenerator should have two mutations: initializeCode() and generateCode()
//   // !Resolver! initializeCode(codeSystem, hashRoot)
//   // 1) hashTop = OTP_Hash_64^hashChainLength (hashRoot)
//   // 2) codeCount = 0
//   // 3) hashIndex = codeSystem.hashChainLength
//   // 4) codeReversalCount = 0

//   // !Resolver! CodeGenerator have these actions / mutations:
//   // initializeCode(): initialize a code generator
//   // generateCode(): generate a code, update CodeGenerator states, and log codeEvent
//   // reverseCode(): reverse CodeGenerator states, and log codeEvent
//   // generateCodeBatch(): generate multiple codes and update CodeGenerator states, and log codeEvent

//   // @Field({defaultValue:codeGeneratorSystems.ACP01})
//   // @Property({ nullable:false})
//   // Must be initialized with one of the systems from codeSystem
//   @Field((type) => CodeSystem, { name: 'codeSystem' })
//   @ManyToOne()
//   public codeSystem: CodeSystem;

//   // @Field(type => CustomACP1ACP2ScalarType, { name: "codeSystem" })
//   // @Property({ persist: false })
//   // get CodeSystem() {
//   // 	if(this.codeSystem == CodeSystemType.ACP1){
//   // 		return new ACP1DTO()
//   // 	}
//   // 	return new ACP2DTO();
//   // }

//   // each codeGenerator object must select from a given list of ACP# classes

//   // array of past code events
//   // code history is now internalized to CodeGenerator, this means this object has a growing embedded-object array.
//   // @Field(type => [CodeEvent])
//   // @OneToMany({ mappedBy: codeEvent => codeEvent })
//   // public codeHistory = new Collection<CodeEvent>(this);
//   // public codeHistory: [CodeEvent];

//   // @Field()
//   // @Property({ nullable:false})
//   // This value is only to be manipulated by codeGen resolvers
//   // !Resolver! This field is initialized but then should remain UNCHANGED thereafter.  Can this be reinforced?
//   @Field()
//   @Property()
//   public hashRoot: string;

//   // @Field()
//   // @Property({ nullable:false})
//   // This value is only to be manipulated by codeGen resolvers
//   // {hashRoot, hashTop} is a private-public key pair.  We never transmit the private key once the codeGenerator for an Item is initialized
//   // {hashRoot, hashTop} relationship is DEFINED and ALWAYS maintained with this equation:
//   // hashTop = OTP_Hash_64^hashChainLength (hashRoot), that is apply OTP_Hash_64() function hashChainLength times
//   // !Resolver! This field is initialized but then should remain UNCHANGED thereafter.  Can this be reinforced?
//   @Field()
//   @Property()
//   public hashTop: string;

//   //@Field()
//   //@Property({ nullable:false})
//   // This value is only to be manipulated by codeGen resolvers
//   @Field((type) => Int)
//   @Property()
//   public codeCount: number;

//   //@Field()
//   //@Property({ nullable:false})
//   // This value is only to be manipulated by codeGen resolvers
//   @Field((type) => Int)
//   @Property()
//   public hashIndex: number;

//   // @Field()
//   // @Property({ nullable:false})
//   // code state reversal is an unusual situation
//   // This value is only to be manipulated by codeGen resolvers
//   @Field((type) => Int)
//   @Property()
//   public codeReversalCount: number;

//   // freecodeCount is decremented each time FREECODE is called!
//   // When freecodeCount is 0, then no more FREECODE call is allowed
//   // Client application must increase this counter again.  Client responsibility
//   @Field((type) => Int, {
//     description: 'Default number of FREECODES is 5',
//     name: 'freeCodeCount',
//   })
//   @Property({ default: 5 })
//   public freeCodeCount: number;

//   // resetCount is decremented each time RESETCODE is called!
//   // When resetCount is 0, then no more RESETCODE call is allowed
//   // Client application must increase this counter again.  Client responsibility
//   @Field((type) => Int, {
//     description: 'Default number of RESETCODES is 5',
//     name: 'resetCodeCount',
//   })
//   @Property({ default: 5 })
//   public resetCodeCount: number;

//   // Leon: here OK?  Still a triangle circular import: CodeGen -> CodeEvent -> Item, CodeGen->Item
//   // !Resolver! You must create the event, then insert the event into this array
//   // The relationship is (1)CodeGenerator to (Many) CodeEvent
//   // And in addition, the Many side must also be ordered in the sequence they are generated

//   //  Leon: I think this is what really should be happening, instead of the array reference...but why is orderBy not available
//   // please find a way to fix this...
//   // I think the use of relationship OneToMany is appropriate AND necessary.  Otherwise a CodeEvent object can be orphaned to no owning side
//   @Field((type) => [CodeEvent], { name: 'codeHistory', nullable: true })
//   @OneToMany(() => CodeEvent, (codeEvent) => codeEvent.codeGenerator, {
//     orderBy: { createdAt: QueryOrder.DESC },
//   })
//   codeHistory = new Collection<CodeEvent>(this);
//   // @Field(type => [CodeEvent])
//   // @Property({nullable: true})
//   // public codeHistory?: CodeEvent[];
// }
