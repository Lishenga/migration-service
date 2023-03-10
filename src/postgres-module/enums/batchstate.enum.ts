import { registerEnumType } from '@nestjs/graphql';

export enum BatchState {
  Submitted = 'Submitted',
  Scheduled = 'Scheduled',
  Completed = 'Completed',
}

registerEnumType(BatchState, {
  name: 'BatchState',
});
