import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPriceToBidTable1638039306553 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE public.bids ADD price float8 NULL DEFAULT 0.0;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE public.bids DROP COLUMN price;');
  }
}
