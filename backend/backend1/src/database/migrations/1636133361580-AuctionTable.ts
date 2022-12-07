import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuctionTable1636133361580 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS auctions (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      token_id varchar NOT NULL,
      creator_id uuid NOT NULL,
      last_bidder_id uuid NULL,
      start_time timestamp NOT NULL,
      length int4 NOT NULL DEFAULT 0,
      current_price float8 NOT NULL DEFAULT 0.0,
      status varchar NOT NULL DEFAULT 'ALIVE'::character varying,
      CONSTRAINT "PK_87d2b34d4829f0519a5c5570368" PRIMARY KEY (id),
      CONSTRAINT "FK_0f350be9847d2357172ad4d877b" FOREIGN KEY (last_bidder_id) REFERENCES public.users(id),
      CONSTRAINT "FK_14a162080d732058e207e0a2e77" FOREIGN KEY (token_id) REFERENCES public.nfts(id),
      CONSTRAINT "FK_223a23dc01c69020074c1f83938" FOREIGN KEY (creator_id) REFERENCES public.users(id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "auctions"`);
  }
}
