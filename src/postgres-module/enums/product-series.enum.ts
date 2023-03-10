// productModel is a more concise and readable name for a product SKU.
// Multiple SKUs might have the same product model designation

import { registerEnumType } from '@nestjs/graphql';

// This is the single point of truth of product model definitions
export enum ProductSeries {
  LUMN = 'LUMN',
  CATCH = 'CATCH',
  CAMP = 'CAMP',
  OASIS = 'OASIS',
  BASE = 'CAMP',
  MPOD = 'MPOD',
  LATEST = 'LATEST',
  APOLLO = 'APOLLO',
  HOME = 'HOME',
  SHOP = 'SHOP',
  OFFICE = 'CAMP',
  WORK = 'WORK',
  FARM = 'FARM',
  COOL = 'COOL',
}

registerEnumType(ProductSeries, {
  name: 'ProductSeries',
});
