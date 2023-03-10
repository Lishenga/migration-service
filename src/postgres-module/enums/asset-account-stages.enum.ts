import { registerEnumType } from '@nestjs/graphql';

export enum AssetAccountStages {
  ASSET_ACCOUNT_CREATED = 'ASSET_ACCOUNT_CREATED',
  ASSET_USER_PAIRED = 'ASSET_USER_PAIRED',
  PAYPLAN_LOCKED = 'PAYPLAN_LOCKED',
  ACCOUNT_ACTIVATED = 'ACCOUNT_ACTIVATED',
  ASSET_UNLOCKED = 'ASSET_UNLOCKED',
  PAYPLAN_COMPLETED = 'PAYPLAN_COMPLETED',
  ACCOUNT_CLOSED = 'ACCOUNT_CLOSED',
}

registerEnumType(AssetAccountStages, {
  name: 'AssetAccountStages',
});
