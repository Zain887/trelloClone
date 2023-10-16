import { MigrationInterface, QueryRunner } from "typeorm";

export class BoardMemberEntityUpdate1696938258068 implements MigrationInterface {
    name = 'BoardMemberEntityUpdate1696938258068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_member" DROP CONSTRAINT "UQ_1a7d194512f2176bdfbcba9d4a2"`);
        await queryRunner.query(`ALTER TABLE "board_member" DROP COLUMN "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_member" ADD "email" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "board_member" ADD CONSTRAINT "UQ_1a7d194512f2176bdfbcba9d4a2" UNIQUE ("email")`);
    }

}
