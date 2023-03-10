import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('codeHistory', { schema: 'b2b_api' })
export class CodeHistory {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'codeHistoryID' })
  codeHistoryId: string;

  @Column('bigint', { primary: true, name: 'otpGeneratorID' })
  otpGeneratorId: number;

  @Column('bigint', { name: 'codeIndex', nullable: true, default: () => "'1'" })
  codeIndex: string | null;

  @Column('character varying', {
    name: 'codeValue',
    nullable: true,
    length: 45,
  })
  codeValue: string | null;

  @Column('timestamp with time zone', {
    name: 'codeDate',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  codeDate: Date | null;

  @Column('character varying', { name: 'codeDays', nullable: true, length: 25 })
  codeDays: string | null;
}
