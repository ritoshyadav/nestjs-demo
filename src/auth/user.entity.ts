import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "src/task/task.entity";

@Entity()
@Unique(['userName'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    // firstName: string;

    // @Column()
    // lastName: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Task, task => task.user, { eager: true })
    task: Task[]

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}