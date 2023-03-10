import { Entity, Column } from 'typeorm';
import { Field, InterfaceType } from '@nestjs/graphql';
import { ActionScope } from 'src/postgres-module/enums/action-scope.enum';
import { ActorTypes } from 'src/postgres-module/enums/actor-types.enum';
import { BaseEntity } from './base.entity';

@InterfaceType()
@Entity({ name: 'actor' })
export abstract class Actor extends BaseEntity {
  @Field((type) => [String], { defaultValue: [] })
  @Column({ type: 'text', array: true, default: '{}' }) // default is an empty array, e.g. no triggers set
  public triggers: string[];

  // This is used for certain event consequences, and for filtering
  @Field((type) => ActorTypes)
  @Column({ type: 'enum', enum: ActorTypes, default: ActorTypes.DEVICE })
  public type: ActorTypes;

  // Some description of the scope that this actor is influencing
  @Field((type) => ActionScope)
  @Column({ type: 'enum', enum: ActionScope, default: ActionScope.DEVELOPMENT })
  public actionScope: ActionScope;

  // Actor's name
  // This is inherited by all sub-classes
  @Field()
  @Column({ type: 'varchar', default: 'eIOT' })
  public actorName: string;

  // Actor's profile
  // This is inherited by all sub-classes
  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    nullable: true,
    default: 'Off-Grid Electric Device',
  })
  public profile?: string;
}

// import { Entity, Enum, Property } from '@mikro-orm/core';
// import { Field, InterfaceType } from '@nestjs/graphql';
// import { ActionScope } from 'src/postgres-module/enums/action-scope.enum';
// import { ActorTypes } from 'src/postgres-module/enums/actor-types.enum';
// import { BaseEntity } from 'src/postgres-module/entities/base.entity';

// // Actor class of objects can "act". e.g. create an event, or send a message
// // All actors must extend from this class to be able to act!
// @InterfaceType()
// @Entity({ abstract: true })
// export abstract class Actor extends BaseEntity {
//   @Field((type) => [String], { defaultValue: [] })
//   @Property({ default: [] }) // default is a null array, e.g. no triggers set
//   public triggers: string[];

//   // This is used for certain event consequences, and for filtering
//   @Field((type) => ActorTypes)
//   @Enum({ items: () => ActorTypes, default: ActorTypes.DEVICE })
//   public type: ActorTypes;

//   // Some description of the scope that this actor is influencing
//   @Field((type) => ActionScope)
//   @Enum({ items: () => ActionScope, default: ActionScope.DEVELOPMENT })
//   public actionScope: ActionScope;

//   // Actor's name
//   // This is inherited by all sub-classes
//   @Field()
//   @Property({ default: 'eIOT' })
//   public actorName: string;

//   // Actor's profile
//   // This is inherited by all sub-classes
//   @Field({ nullable: true })
//   @Property({ default: 'Off-Grid Electric Device' })
//   public profile?: string;
// }

/*
Adding Event Generation functionalities to Actors
Any class based on Actor can inherit these same behavior

1) Actor behavioral model
Actor behavior are controlled by two attributes: 
- scope: the influence of a actor,  and 
- type: what type of actions
An actor can change its scope, but not its type!

Consistent "action" by objects can be implemented
by making all classes based on Actor follow the same action initiation logic

2) Actor behavior change control
export enum ActionScope {
	GLOBAL = "GLOBAL",			// Combine all scopes below
	SYSTEM = "SYSTEM",			// System diagnostics 
	MANAGEMENT = "MANAGEMENT",	// For Omnivoltaic management purposes
	DEVELOPMENT = "DEVELOPMENT", // For development purposes
	CLIENT = "CLIENT"			// for and on behalf of client
}
- DEVELOPMENT: this is a narrowest scope, only used at development stage
- CLIENT: Only when an client specifically demands this
- MANAGEMENT: For Omnivoltaic product management purposes
- SYSTEM: Used for system integration and component coupling
- GLOBAL: All the above

Default scope should be DEVELOPMENT, 
meaning it does not affect actual production system behavior.

Action mutation must specify 1) what is the action, and 2) action triggering condition


3) Actor-based object logEvent action
Actions are mutations that cause some change of state.
logEvent is a an action that causes event to be logged.

3.1) What is a logEvent action
All Actor based object X should have a mutation resolver X.logEvent

logEvent takes tha properties of and Actor, and create an event log:
logEvent: (Actor, Action, Location, Time, Signal=True/False) =>{create event object}
Actor types are federated cross the event and thing services,
but as Actor is a abstract classes, field-wise duplication can be done:
	event.Actor.type = thing.Actor.type,  etc..
	event.Action.type = thing.Actor.actionScope, etc...
	event.Location, whatever geo-locational information available from this Actor
	Time = realtime
	Signal = TRUE if thing.Actor.actionScope = GLOBAL

3.2) Action trigger
To avoid hard-coded action trigger logic, 
and to have a way to globally change all actor behavior.
WE will use the UPDATE resolver actions to trigger an action.
Other resolvers should not trigger action, so that actions are deliberate!
When first created, an actor as no trigger: triggers = []

Actor behavior changes when one action triggers is registered by inserting to the triggers array
So, if actor.triggers = ["logEvent"], then each time an UPDATE resolver is called, 
it triggers an action.  The implied implementation is that each of the UPDATE resolver
(at the end of its functionality), must check if its action triggers an action.
It then calls the action handler, in this case, logEvent.

4) Other actions to be defined!
*/
