import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "./user.entity";

@Entity('key')
export class Key {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({name: 'userId'})
    user: Relation<User>;

    @Column({ type: 'integer', name: 'user_id' })
    userId: number;
}