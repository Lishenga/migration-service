import { registerEnumType } from '@nestjs/graphql';

// stages that an Item can go through
export enum LifeCycle {
  INITIATED = 'INITIATED',
  PRODUCED = 'PRODUCED',
  ASSIGNED = 'ASSIGNED',
  SHIPPED = 'SHIPPED',
  INSTALLED = 'INSTALLED',
  RETURNED = 'RETURNED',
  RECYCLED = 'RECYCLED',
}

registerEnumType(LifeCycle, {
  name: 'LifeCycle',
});
