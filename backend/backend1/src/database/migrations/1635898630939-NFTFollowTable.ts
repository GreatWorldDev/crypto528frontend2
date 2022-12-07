import { MigrationInterface, QueryRunner } from 'typeorm';

export class NFTFollowTable1635898630939 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS nft_follows (
      "time" timestamptz NOT NULL DEFAULT now(),
      token_id varchar NOT NULL,
      user_id uuid NOT NULL,
      CONSTRAINT "PK_9b6ccba58f648cd8d3a4d6da222" PRIMARY KEY (token_id, user_id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "nft_follows"`);
  }
}
