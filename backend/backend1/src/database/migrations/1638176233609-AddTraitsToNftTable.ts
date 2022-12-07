import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTraitsToNftTable1638176233609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE public.nfts ADD traits jsonb NULL;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE public.nfts DROP COLUMN traits;`);
  }
}
