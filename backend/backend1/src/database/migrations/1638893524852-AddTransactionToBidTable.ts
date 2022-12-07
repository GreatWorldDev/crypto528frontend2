import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTransactionToBidTable1638893524852 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE public.bids ADD "transaction" varchar NULL;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE public.bids DROP COLUMN "transaction";`);
  }
}
