import { MigrationInterface, QueryRunner } from 'typeorm';

export class NFTTable1635177399871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS nfts (
      id varchar NOT NULL,
      category varchar NOT NULL DEFAULT ''::character varying,
      title varchar NOT NULL,
      description varchar NOT NULL DEFAULT ''::character varying,
      image varchar NOT NULL,
      image_type varchar NOT NULL,
      price float8 NOT NULL DEFAULT '0'::double precision,
      is_sale int2 NOT NULL DEFAULT 0,
      token_uri varchar NOT NULL,
      "time" timestamp NOT NULL DEFAULT now(),
      creator_id uuid NOT NULL,
      owner_id uuid NOT NULL,
      currency_type varchar NOT NULL,
      follower_count int4 DEFAULT '0',
      collection varchar NOT NULL DEFAULT 'Yieldly Boom'::character varying,
      tags jsonb NOT NULL DEFAULT '[]'::jsonb,
      CONSTRAINT "PK_65562dd9630b48c4d4710d66772" PRIMARY KEY (id),
      CONSTRAINT "FK_64b2ed147665cd10e96c26cf560" FOREIGN KEY (owner_id) REFERENCES public.users(id),
      CONSTRAINT "FK_d6e79bf926c48783bdcfbecf150" FOREIGN KEY (creator_id) REFERENCES public.users(id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "nfts"`);
  }
}
