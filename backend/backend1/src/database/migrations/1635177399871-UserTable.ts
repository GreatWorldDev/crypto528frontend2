import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1635177399871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS users (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      user_name varchar NOT NULL,
      nickname varchar NULL,
      created timestamp NOT NULL DEFAULT now(),
      bio varchar NOT NULL DEFAULT ''::character varying,
      avatar_image varchar NULL,
      cover_image varchar NULL,
      website_url varchar NULL,
      discord_url varchar NULL,
      facebook_url varchar NULL,
      instagram_url varchar NULL,
      twitter_url varchar NULL,
      CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id),
      CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE (nickname)
    )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}
