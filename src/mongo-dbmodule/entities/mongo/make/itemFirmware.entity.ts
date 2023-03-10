import { Entity, Column, Index, Unique } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { CodeSystemType } from 'src/postgres-module/enums/code-system-type.enum';
import { Actor } from '../actor.entity';

@ObjectType()
@Entity({ name: 'itemfirmware' })
@Index(
  [
    'description',
    'codeSystem',
    'version',
    'triggers',
    'type',
    'actionScope',
    'actorName',
    'profile',
  ],
  { fulltext: true },
)
@Unique(['version'])
export class ItemFirmware extends Actor {
  @Field({ description: 'Version Numbers are controlled by OVES Production.' })
  @Column()
  public version: string;

  @Field((type) => CodeSystemType, { name: 'codeSystem' })
  @Column()
  public codeSystem: CodeSystemType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  public description: string;
}
