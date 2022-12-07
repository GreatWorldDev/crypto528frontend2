import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTeamMemberToUserTable1638975664128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE public.users ADD team_member bool NOT NULL DEFAULT false;`);

    await queryRunner.query(`UPDATE public.users SET team_member=true;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE public.users DROP COLUMN team_member;`);
  }
}
