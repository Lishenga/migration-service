import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { OtpGenerator } from "./otpgenerator.entity";

@Entity("otpSystem", { schema: "b2b_api" })
export class OtpSystem {
    @PrimaryGeneratedColumn({ type: "bigint", name: "otpSystemID" })
    otpSystemId: string;

    @Column("character varying", {
        name: "otpSystemName",
        nullable: true,
        length: 45,
    })
    otpSystemName: string | null;

    @Column("character varying", {
        name: "otpOperatorDescription",
        nullable: true,
        length: 1000,
    })
    otpOperatorDescription: string | null;

    @Column("bigint", { name: "otpHashChainLength", nullable: true })
    otpHashChainLength: string | null;

    @Column("bigint", { name: "otpMaxHCJ", nullable: true })
    otpMaxHcj: string | null;

    @OneToMany(() => OtpGenerator, (otpGenerator) => otpGenerator.otpSystem)
    otpGenerators: OtpGenerator[];
}