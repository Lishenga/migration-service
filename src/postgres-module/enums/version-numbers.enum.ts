import { registerEnumType } from '@nestjs/graphql';

export enum VersionNumbers {
  ABCE1234 = 'ABCE1234',
  ABCE6789 = 'ABCE6789',
}

registerEnumType(VersionNumbers, {
  name: 'VersionNumbers',
});
