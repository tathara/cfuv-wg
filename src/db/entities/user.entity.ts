import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Key } from './key.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', nullable: false, unique: true, name: 'chat_id' })
  chatId: number;

  @OneToMany(() => Key, (key) => key.id)
  keys: Relation<Key[]>;
}
