import { registerEnumType } from '@nestjs/graphql';

// stages that an Item can go through
export enum CodeSystemType {
  ACP1 = 'ACP1',
  ACP2 = 'ACP2',
}

registerEnumType(CodeSystemType, {
  name: 'CodeSystemType',
});
