import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRespository extends Repository<User>{
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { userName, password } = authCredentialsDto;
        /** If check manual
        const exists = await this.findOne({ userName });
        if(exists){
            // throw 
        }
        */

        const salt = await bcrypt.genSalt();

        const user = new User();
        user.userName = userName;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
            return user;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('UserName already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { userName, password } = authCredentialsDto;
        const user = await this.findOne({ userName });
        if (user && await user.validatePassword(password)) {
            return userName;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}