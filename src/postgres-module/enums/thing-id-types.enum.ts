import { registerEnumType } from '@nestjs/graphql';

export enum ThingIDTypes {
  UUID = 'UUID',
  MAC = 'MAC',
  DOI = 'DOI', // ISO standard
}

registerEnumType(ThingIDTypes, {
  name: 'ThingIDTypes',
});
