import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import { User } from "./user.entity";

@Entity('key')
export class Key {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({name: 'user_id'})
    user: Relation<User>;
}