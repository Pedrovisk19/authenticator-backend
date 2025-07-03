import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddingColumUserIdWhenCreateUser1750730824588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("user", new TableColumn({
            name: "userId",
            type: "int",
            isNullable: true, // ou false conforme sua regra
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
