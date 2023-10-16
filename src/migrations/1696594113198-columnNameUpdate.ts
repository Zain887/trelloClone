import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnNameUpdate1696594113198 implements MigrationInterface {
    name = 'ColumnNameUpdate1696594113198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "card_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "cardId" uuid, CONSTRAINT "PK_7aa48e3182f530f73e9b8ad87af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "cardId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todo_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying(256) NOT NULL, "cardId" uuid, CONSTRAINT "PK_d454c4b9eac15cc27c2ed8e4138" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(64) NOT NULL, "description" text, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "dueDate" TIMESTAMP, "reminderDate" TIMESTAMP, "listId" uuid, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."list_position_enum" AS ENUM('toDo', 'doing', 'done')`);
        await queryRunner.query(`CREATE TABLE "list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(32) NOT NULL, "position" "public"."list_position_enum" NOT NULL, "boardId" uuid, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(64) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(32) NOT NULL, "lastName" character varying(32) NOT NULL, "email" character varying(64) NOT NULL, "password" character varying(256) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "boardId" uuid, CONSTRAINT "PK_c27bedbf846391cf1af5e4a74d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying(64) NOT NULL, "cardId" uuid, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "member_boards_board" ("memberId" uuid NOT NULL, "boardId" uuid NOT NULL, CONSTRAINT "PK_15382789f1e8234e77a8c48671b" PRIMARY KEY ("memberId", "boardId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_01ea95651b5a5fd70029338c09" ON "member_boards_board" ("memberId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ed1c25c4b0a11a508bade8f5ed" ON "member_boards_board" ("boardId") `);
        await queryRunner.query(`ALTER TABLE "card_member" ADD CONSTRAINT "FK_86f53735488cba281e995d43041" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_member" ADD CONSTRAINT "FK_1bfb0cd7de3bcc538399532588b" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_5dd31f454fdc52a2e336264b076" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo_item" ADD CONSTRAINT "FK_a4b301cb6d350f63719aaab9167" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_4267e15872bbabeb7d9c0448ca0" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "FK_bbb2794eef8a900448a5f487eb5" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member" ADD CONSTRAINT "FK_08897b166dee565859b7fb2fcc8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_c9951f13af7909d37c0e2aec484" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_member" ADD CONSTRAINT "FK_648b9cad9a34f1a9601282751ec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_member" ADD CONSTRAINT "FK_2f41fdf7c09ac52f708260d811b" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_775975e9533f31094609e6f80a2" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "member_boards_board" ADD CONSTRAINT "FK_01ea95651b5a5fd70029338c093" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "member_boards_board" ADD CONSTRAINT "FK_ed1c25c4b0a11a508bade8f5edc" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_boards_board" DROP CONSTRAINT "FK_ed1c25c4b0a11a508bade8f5edc"`);
        await queryRunner.query(`ALTER TABLE "member_boards_board" DROP CONSTRAINT "FK_01ea95651b5a5fd70029338c093"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_775975e9533f31094609e6f80a2"`);
        await queryRunner.query(`ALTER TABLE "board_member" DROP CONSTRAINT "FK_2f41fdf7c09ac52f708260d811b"`);
        await queryRunner.query(`ALTER TABLE "board_member" DROP CONSTRAINT "FK_648b9cad9a34f1a9601282751ec"`);
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_c9951f13af7909d37c0e2aec484"`);
        await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_08897b166dee565859b7fb2fcc8"`);
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "FK_bbb2794eef8a900448a5f487eb5"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_4267e15872bbabeb7d9c0448ca0"`);
        await queryRunner.query(`ALTER TABLE "todo_item" DROP CONSTRAINT "FK_a4b301cb6d350f63719aaab9167"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_5dd31f454fdc52a2e336264b076"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "card_member" DROP CONSTRAINT "FK_1bfb0cd7de3bcc538399532588b"`);
        await queryRunner.query(`ALTER TABLE "card_member" DROP CONSTRAINT "FK_86f53735488cba281e995d43041"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed1c25c4b0a11a508bade8f5ed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01ea95651b5a5fd70029338c09"`);
        await queryRunner.query(`DROP TABLE "member_boards_board"`);
        await queryRunner.query(`DROP TABLE "todo"`);
        await queryRunner.query(`DROP TABLE "board_member"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "member"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`DROP TYPE "public"."list_position_enum"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "todo_item"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "card_member"`);
    }

}
