import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("productBatch", { schema: "b2b_api" })
export class ProductBatch {
    @PrimaryGeneratedColumn({ type: "bigint", name: "productBatchID" })
    productBatchId: string;

    @Column("character varying", {
        name: "productBatchNumber",
        nullable: true,
        length: 45,
    })
    productBatchNumber: string | null;

    @Column("timestamp with time zone", {
        name: "productBatchDate",
        nullable: true,
    })
    productBatchDate: Date | null;

    @Column("character varying", {
        name: "productBatchNotes",
        nullable: true,
        length: 1000,
    })
    productBatchNotes: string | null;

    @Column("character varying", {
        name: "productBatchState",
        nullable: true,
        length: 200,
    })
    productBatchState: string | null;
}