import { MigrationInterface, QueryRunner } from "typeorm";

export class BoardEntityUpdate1697717103551 implements MigrationInterface {
    name = 'BoardEntityUpdate1697717103551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "isActive"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

}
