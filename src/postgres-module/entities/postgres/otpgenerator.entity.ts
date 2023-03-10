import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { OtpSystem } from './otpsystem.entity';

@Entity('otpGenerator', { schema: 'b2b_api' })
export class OtpGenerator {
  @Column('bigint', { primary: true, name: 'otpGeneratorID' })
  otpGeneratorId: number;

  @Column('bigint', { primary: true, name: 'otpSystemID' })
  otpSystemId: string;

  @Column('character varying', {
    name: 'otpGeneratorHash_Top',
    nullable: true,
    length: 45,
  })
  otpGeneratorHashTop: string | null;

  @Column('character varying', { name: 'otpGeneratorHash_Root', length: 45 })
  otpGeneratorHashRoot: string;

  @Column('bigint', { name: 'otpGeneratorCurrent_Count', default: () => "'0'" })
  otpGeneratorCurrentCount: string;

  @Column('bigint', { name: 'otpGeneratorCurrent_Hash_Index' })
  otpGeneratorCurrentHashIndex: string;

  @Column('character varying', {
    name: 'otpGeneratorStatus',
    nullable: true,
    length: 45,
  })
  otpGeneratorStatus: string | null;

  @ManyToOne(() => OtpSystem, (otpSystem) => otpSystem.otpGenerators)
  @JoinColumn([{ name: 'otpSystemID', referencedColumnName: 'otpSystemId' }])
  otpSystem: OtpSystem;
}
