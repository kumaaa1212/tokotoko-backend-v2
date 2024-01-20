import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  // これにより、レスポンスの対象からpasswordを除外することができる
  password: string;

  @Column()
  email: string;

  @Column()
  team: string;

  @Column()
  icon: string;

  @Column()
  twitterURL: string;

  @Column()
  teamURL: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
