import { registerEnumType } from '@nestjs/graphql';

export enum ActorTypes {
  DEVICE = 'DEVICE', // Physical device
  PERSON = 'PERSON', // Admin / Distributor / ENd-Users alike
  PLACE = 'PLACE', // Geo-event
  ORGANIZATION = 'ORGANIZATION', // Organization event
  EVENT = 'EVENT', // an Event can also act
  ACCOUNT = 'ACCOUNT', // an Account can be bank account, or production batch
  SOFTWARE = 'SOFTWARE', // Some programming entities can act, suh as Avatar
}

registerEnumType(ActorTypes, {
  name: 'ActorTypes',
});
