import { MigrationInterface, QueryRunner } from "typeorm";

export class TodoEntityUpdation1698046998617 implements MigrationInterface {
    name = 'TodoEntityUpdation1698046998617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" RENAME COLUMN "text" TO "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" RENAME COLUMN "title" TO "text"`);
    }

}
