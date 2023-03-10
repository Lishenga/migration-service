import { registerEnumType } from '@nestjs/graphql';

// itemCodeTypes is an explicit declaration of which
// the relationship between firmware versions and the type of codes properly implemented by a firmware
// This is the single place of truth of all codes implemented

// a hard coded ENUM ensure this is an immutable and finite set
export enum CodeTypes {
  FREECODE = 'FREECODE', //this code set a PAYG product to "FREE" State
  DAYSCODE = 'DAYSCODE', //this code add a number of days to a PAYG product "remaining-credit-days-counter"
  RESETCODE = 'RESETCODE', //this code set a PAYG product to "Initial" State = {"State": "PAYG", "RCD":0}
  SYNCCODE = 'SYNCCODE', //this code is not defined yet
}

registerEnumType(CodeTypes, {
  name: 'CodeTypes',
});
