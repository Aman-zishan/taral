import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1658419457941 implements MigrationInterface {
  name = 'InitialSchema1658419457941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "file" ("id" SERIAL NOT NULL, "original_name" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL, "last_updated" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file_versions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hash" character varying NOT NULL, "path" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL, "on_disk_name" character varying NOT NULL, "fileId" integer, CONSTRAINT "PK_caca394bb05012a3d17c1d8b336" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "firstName" character varying, "lastName" character varying, "hash" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `,
    );
    await queryRunner.query(
      `CREATE TABLE "forgot" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df507d27b0fb20cd5f7bef9b9a" ON "forgot" ("hash") `,
    );
    await queryRunner.query(
      `ALTER TABLE "file_versions" ADD CONSTRAINT "FK_5b2975bbaeb5c5db8c57ac438f4" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "forgot" ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "forgot" DROP CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_versions" DROP CONSTRAINT "FK_5b2975bbaeb5c5db8c57ac438f4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df507d27b0fb20cd5f7bef9b9a"`,
    );
    await queryRunner.query(`DROP TABLE "forgot"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e282acb94d2e3aec10f480e4f6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "file_versions"`);
    await queryRunner.query(`DROP TABLE "file"`);
  }
}
