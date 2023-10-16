import { MigrationInterface, QueryRunner } from "typeorm";

export class MemberentityUpdation1696847411104 implements MigrationInterface {
    name = 'MemberentityUpdation1696847411104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "UQ_4678079964ab375b2b31849456c"`);
        await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member" ADD "email" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "UQ_4678079964ab375b2b31849456c" UNIQUE ("email")`);
    }

}
