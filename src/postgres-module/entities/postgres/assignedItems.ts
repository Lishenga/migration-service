import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
//   import { Distributor } from "./Distributor";

@Entity('assignedItems', { schema: 'b2b_api' })
export class AssignedItems {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'assignedItemsID' })
  assignedItemsId: string;

  @Column('bigint', { primary: true, name: 'productItemID' })
  productItemId: string;

  @Column('bigint', { primary: true, name: 'distributorID' })
  distributorId: string;

  @Column('timestamp with time zone', {
    name: 'itemAssignDate',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  itemAssignDate: Date | null;

  @Column('character varying', {
    name: 'itemAssignNote',
    nullable: true,
    length: 45,
  })
  itemAssignNote: string | null;

  @Column('numeric', {
    name: 'valuePerDay',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  valuePerDay: string | null;

  @Column('bigint', { name: 'valueDays', nullable: true })
  valueDays: string | null;

  @Column('bigint', { name: 'longevityDays', nullable: true })
  longevityDays: string | null;

  @Column('timestamp with time zone', { name: 'activateDate', nullable: true })
  activateDate: Date | null;

  @Column('character varying', {
    name: 'deployNotes',
    nullable: true,
    length: 45,
  })
  deployNotes: string | null;

  // @ManyToOne(() => Distributor, (distributor) => distributor.assignedItems)
  // @JoinColumn([
  //   { name: "distributorID", referencedColumnName: "distributorId" },
  // ])
  // distributor: Distributor;
}
