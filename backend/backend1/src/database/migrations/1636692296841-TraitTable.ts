import { MigrationInterface, QueryRunner } from 'typeorm';

export class TraitTable1636692296841 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE public.traits (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        "key" varchar NOT NULL,
        value varchar NOT NULL,
        token_id varchar NOT NULL,
        CONSTRAINT "PK_3956071aa0a8eb8210aa1c6a563" PRIMARY KEY (id),
        CONSTRAINT "FK_c672d6ec678db2e646af90787da" FOREIGN KEY (token_id) REFERENCES public.nfts(id)
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "traits"`);
  }
}
