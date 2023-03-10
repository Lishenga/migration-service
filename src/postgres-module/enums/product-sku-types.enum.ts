// productModel is a more concise and readable name for a product SKU.
// Multiple SKUs might have the same product model designation

import { registerEnumType } from '@nestjs/graphql';

// This is the single point of truth of product model definitions
export enum SkuTypes {
  MATERIAL = 'MATERIAL',
  PART = 'PART',
  PRODUCT = 'PRODUCT',
  PACK = 'PACK',
}

registerEnumType(SkuTypes, {
  name: 'SkuTypes',
});
