import { registerEnumType } from '@nestjs/graphql';
// ENUMS for initializing a code generator
export enum INITIALIZECODEGENENUMS {
  HASHINDEX = 100000,
  CODECOUNT = 0,
  CODEREVERSALCOUNT = 0,
}

registerEnumType(INITIALIZECODEGENENUMS, {
  name: 'InitializeCodeGenEnums',
});
