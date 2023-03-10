// Action Scope is one feature that will drive the micro-services architecture

import { registerEnumType } from '@nestjs/graphql';

// This is alo used to contribute the event signal topic string
export enum ActionScope {
  GLOBAL = 'GLOBAL', // Combine all scopes below
  SYSTEM = 'SYSTEM', // System diagnostics
  MANAGEMENT = 'MANAGEMENT', // For Omnivoltaic management purposes
  DEVELOPMENT = 'DEVELOPMENT', // For development purposes
  CLIENT = 'CLIENT', // for and on behalf of client
}

registerEnumType(ActionScope, {
  name: 'ActionScope',
});
