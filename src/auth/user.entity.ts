import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

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

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}