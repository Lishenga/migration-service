// Action Scope is one feature that will drive the micro-services architecture

import { registerEnumType } from '@nestjs/graphql';

// This is alo used to contribute the event signal topic string
export enum PaginationEnum {
  CURSOR = 'CURSOR', // Combine all scopes below
  OFFSET = 'OFFSET',
}

registerEnumType(PaginationEnum, {
  name: 'PaginationEnum',
});
