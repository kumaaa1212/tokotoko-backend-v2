import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserMigration1704530302024 implements MigrationInterface {
  name = 'UserMigration1704530302024';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`team\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, \`twitterURL\` varchar(255) NOT NULL, \`teamURL\` varchar(255) NOT NULL, \`createdAt\` varchar(255) NOT NULL, \`updatedAt\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
