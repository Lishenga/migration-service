import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { PERMISSIONS } from 'src/postgres-module/enums/permissions.enum';
import { Org } from './org.entity';

@Entity({ name: 'distributor' })
@ObjectType()
export class Distributor extends Org {
  /* 
// Leon Notes: This is meant to be a One-to-Many relationship, One on the servicer side, many on the client side
// So a distributor can delegate different services to different servicers
  @Field()
  @Column()
  public delegations: [ClientServicer];
  // Leon Notes:  Please ensure the exclusivity of a service delegation must cause the distributor to lose access to the delegated service!!
*/

  // Standard information sets of a Distributor:
  // default org type is OrgTypes.DISTRIBUTOR
  // default org contact person should be CEO

  // Distribution related information

  // itemSKU type is to be federated from the thing-microservice
  // @Field()

  @Column({ nullable: true })
  @Field((type) => PERMISSIONS, { nullable: true })
  public activeSubRolePermission: PERMISSIONS;

  @Column({ nullable: true })
  public password: string;

  @Column({ nullable: true })
  public mqtt_password: string;

  @Column({ nullable: true, default: false })
  public delegateAuthorityToServicer: boolean;

  @Column({ nullable: true })
  public salt: string;

  public perms: any[];
}
