import { MigrationInterface, QueryRunner } from 'typeorm';

export class BidTable1636133814421 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS bids (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      "time" timestamp NOT NULL DEFAULT now(),
      auction_id uuid NOT NULL,
      token_id varchar NOT NULL,
      address_id uuid NOT NULL,
      user_id uuid NOT NULL,
      CONSTRAINT "PK_7950d066d322aab3a488ac39fe5" PRIMARY KEY (id),
      CONSTRAINT "FK_2419b59ca8d821dc2239fb6b432" FOREIGN KEY (address_id) REFERENCES public.addresses(id),
      CONSTRAINT "FK_26ec1a9444df3914914b72147dc" FOREIGN KEY (token_id) REFERENCES public.nfts(id),
      CONSTRAINT "FK_7d24f04e55838b694acc9d35bfe" FOREIGN KEY (auction_id) REFERENCES public.auctions(id),
      CONSTRAINT "FK_7d24f044acc9d35bfee55838b69" FOREIGN KEY (user_id) REFERENCES public.users(id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "bids"`);
  }
}
