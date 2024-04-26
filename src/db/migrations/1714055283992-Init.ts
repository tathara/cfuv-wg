import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1714055283992 implements MigrationInterface {
    name = 'Init1714055283992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "key" (
                "id" SERIAL NOT NULL,
                "user_id" integer,
                CONSTRAINT "PK_5bd67cf28791e02bf07b0367ace" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "chat_id" bigint NOT NULL,
                CONSTRAINT "UQ_c43d9c7669f5c12f23686e1b891" UNIQUE ("chat_id"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "key"
            ADD CONSTRAINT "FK_ce3251bd4e97eda3b0a4a9d7ddd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "key" DROP CONSTRAINT "FK_ce3251bd4e97eda3b0a4a9d7ddd"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "key"
        `);
    }

}
