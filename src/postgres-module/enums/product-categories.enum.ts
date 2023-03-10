// productFamilies are used to organize product category tree for internal use.
// This list is strictly maintained here to ensure there is no arbitrary "scope creeping"

import { registerEnumType } from '@nestjs/graphql';

// This is the single point of truth of product family definitions
export enum ProductCategories {
  STORAGE = 'STORAGE',
  SOLAR = 'SOLAR',
  APPLIANCE = 'APPLIANCE',
  EQUIPMENT = 'EQUIPMENT',
  TOOLS = 'TOOLS',
}

registerEnumType(ProductCategories, {
  name: 'ProductCategories',
});
