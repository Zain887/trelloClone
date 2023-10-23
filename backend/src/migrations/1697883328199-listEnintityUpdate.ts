import { MigrationInterface, QueryRunner } from "typeorm";

export class ListEnintityUpdate1697883328199 implements MigrationInterface {
    name = 'ListEnintityUpdate1697883328199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "position"`);
        await queryRunner.query(`DROP TYPE "public"."list_position_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."list_position_enum" AS ENUM('toDo', 'doing', 'done')`);
        await queryRunner.query(`ALTER TABLE "list" ADD "position" "public"."list_position_enum" NOT NULL`);
    }

}
