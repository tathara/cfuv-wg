import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameAndPathToKeys1714150700680 implements MigrationInterface {
  name = 'AddNameAndPathToKeys1714150700680';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "key"
            ADD "name" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "key"
            ADD CONSTRAINT "UQ_295e492b15abf443f492c5331c7" UNIQUE ("name")
        `);
    await queryRunner.query(`
            ALTER TABLE "key"
            ADD "path" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "key"
            ADD CONSTRAINT "UQ_f4aae493e5a4cc1eebfc8bd63b0" UNIQUE ("path")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "key" DROP CONSTRAINT "UQ_f4aae493e5a4cc1eebfc8bd63b0"
        `);
    await queryRunner.query(`
            ALTER TABLE "key" DROP COLUMN "path"
        `);
    await queryRunner.query(`
            ALTER TABLE "key" DROP CONSTRAINT "UQ_295e492b15abf443f492c5331c7"
        `);
    await queryRunner.query(`
            ALTER TABLE "key" DROP COLUMN "name"
        `);
  }
}
