import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { User } from './user.entity';
import { join } from 'path';

@Entity('key')
export class Key {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, unique: true })
  path: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

  @BeforeInsert()
  setupNameAndPath() {
    this.name = 'wg' + this.id;

    const keysPath = join(process.cwd() + 'keys/');
    this.path = keysPath + this.name;
  }
}
