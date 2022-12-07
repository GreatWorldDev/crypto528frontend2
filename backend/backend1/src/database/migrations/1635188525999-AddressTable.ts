import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddressTable1635188525999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS addresses (
      id uuid NOT NULL DEFAULT uuid_generate_v4(),
      wallet_address varchar NOT NULL,
      "type" varchar NOT NULL,
      user_id uuid NOT NULL,
      CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY (id),
      CONSTRAINT "UQ_217a4d84f8d0ad41075da92d39d" UNIQUE (wallet_address),
      CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY (user_id) REFERENCES users(id)
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "addresses"`);
  }
}
