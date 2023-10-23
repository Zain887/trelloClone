import { MigrationInterface, QueryRunner } from "typeorm";

export class TodoEntityUpdation1697463077107 implements MigrationInterface {
    name = 'TodoEntityUpdation1697463077107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "member_boards_board" ("memberId" uuid NOT NULL, "boardId" uuid NOT NULL, CONSTRAINT "PK_15382789f1e8234e77a8c48671b" PRIMARY KEY ("memberId", "boardId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_01ea95651b5a5fd70029338c09" ON "member_boards_board" ("memberId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ed1c25c4b0a11a508bade8f5ed" ON "member_boards_board" ("boardId") `);
        await queryRunner.query(`ALTER TABLE "todo_item" ADD "todoId" uuid`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "text" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo_item" ADD CONSTRAINT "FK_c6457ad86a730f67df8f7426df1" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member_boards_board" ADD CONSTRAINT "FK_01ea95651b5a5fd70029338c093" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "member_boards_board" ADD CONSTRAINT "FK_ed1c25c4b0a11a508bade8f5edc" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_boards_board" DROP CONSTRAINT "FK_ed1c25c4b0a11a508bade8f5edc"`);
        await queryRunner.query(`ALTER TABLE "member_boards_board" DROP CONSTRAINT "FK_01ea95651b5a5fd70029338c093"`);
        await queryRunner.query(`ALTER TABLE "todo_item" DROP CONSTRAINT "FK_c6457ad86a730f67df8f7426df1"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "text" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo_item" DROP COLUMN "todoId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed1c25c4b0a11a508bade8f5ed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01ea95651b5a5fd70029338c09"`);
        await queryRunner.query(`DROP TABLE "member_boards_board"`);
    }

}
