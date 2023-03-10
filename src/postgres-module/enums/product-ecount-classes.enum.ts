// productModel is a more concise and readable name for a product SKU.
// Multiple SKUs might have the same product model designation

import { registerEnumType } from '@nestjs/graphql';

// This is the single point of truth of product model definitions
export enum EcountClasses {
  FINISHED_GOODS = 'FINISHED_GOODS',
  SEMI_FINISHED_GOODS = 'SEMI_FINISHED_GOODS',
  RAW_MATERIAL = 'RAW_MATERIAL',
}

registerEnumType(EcountClasses, {
  name: 'EcountClasses',
});
