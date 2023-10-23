import { MigrationInterface, QueryRunner } from "typeorm";

export class TodoEntityUpdate1698020165060 implements MigrationInterface {
    name = 'TodoEntityUpdate1698020165060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."todo_item_status_enum" AS ENUM('todo', 'in_process', 'done')`);
        await queryRunner.query(`ALTER TABLE "todo_item" ADD "status" "public"."todo_item_status_enum" NOT NULL DEFAULT 'todo'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_item" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."todo_item_status_enum"`);
    }

}
