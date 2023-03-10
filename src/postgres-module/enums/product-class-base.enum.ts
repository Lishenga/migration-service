import { registerEnumType } from '@nestjs/graphql';

// This is the single point of truth of product model definitions
export enum ProductClassBases {
  AH03 = '03AH',
  AH06 = '06AH',
  AH12 = '12AH',
  AH18 = '18AH',
  AH24 = '24AH',
  AH30 = '30AH',
  AH36 = '36AH',
  AH42 = '42AH',
  AH48 = '48AH',
  L190 = 'L190',
  L300 = 'L300',
  L500 = 'L500',
  M400 = 'M400',
  M600 = 'M600',
  M630 = 'M630',
  C300 = 'C300',
  BS1K = 'BS1K',
  BS2K = 'BS2K',
  LA1K = 'LA1K',
  LA2K = 'LA2K',
  TV24 = 'TV24',
  TV32 = 'TV32',
  TV40 = 'TV40',
  TV50 = 'TV50',
  MAT0 = 'MAT0',
  MAT1 = 'MAT1',
  PART = 'PART',
  PACK = 'PACK',
  MISC = 'MISC',
  TEST = 'TEST',
}

/*
Batch number formation: BATCH_ID = [ProductBatchBases] + [YYMM] + [000-999]
OEM product serial number formation: OEM_ID = [ProductBatchBases] + [YYMM] + [000000-999999]
*/
registerEnumType(ProductClassBases, {
  name: 'ProductClassBases',
});
