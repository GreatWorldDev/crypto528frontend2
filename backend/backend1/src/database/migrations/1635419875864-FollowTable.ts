import { MigrationInterface, QueryRunner } from 'typeorm';

export class FollowTable1635419875864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS follows (
        created timestamp NOT NULL DEFAULT now(),
        user_id uuid NOT NULL,
        following_id uuid NOT NULL,
        CONSTRAINT "PK_0ac2d8faaa76f776ef680a834c2" PRIMARY KEY (user_id, following_id),
        CONSTRAINT "FK_941d172275662c2b9d8b9f4270c" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE,
        CONSTRAINT "FK_c518e3988b9c057920afaf2d8c0" FOREIGN KEY (following_id) REFERENCES public.users(id) ON DELETE CASCADE
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "follows"`);
  }
}
