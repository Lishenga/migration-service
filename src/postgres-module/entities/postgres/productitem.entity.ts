import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productItem', { schema: 'b2b_api' })
export class ProductItem {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'productItemID' })
  productItemId: number;

  @Column('bigint', {
    primary: true,
    name: 'productModelID',
    default: () => "'0'",
  })
  productModelId: string;

  @Column('bigint', { primary: true, name: 'productBatchID' })
  productBatchId: string;

  @Column('character varying', {
    name: 'productItemOEM_SN',
    nullable: true,
    length: 45,
  })
  productItemOemSn: string | null;

  @Column('character varying', {
    name: 'productItemPAYG_SN',
    nullable: true,
    length: 45,
  })
  productItemPaygSn: string | null;

  @Column('character varying', {
    name: 'lifeCycleStatus',
    nullable: true,
    length: 25,
    default: () => "'Shipped'",
  })
  lifeCycleStatus: string | null;

  @Column('character varying', {
    name: 'firmwareVersion',
    nullable: true,
    length: 5000,
  })
  firmwareVersion: string | null;

  batchNumber: string;
}
