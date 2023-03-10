import { registerEnumType } from '@nestjs/graphql';

export enum QueryOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(QueryOrder, {
  name: 'QueryOrder',
});
