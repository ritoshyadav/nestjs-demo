import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interace';
import { User } from './user.entity';
import { UserRespository } from './user.repository';

@Injectable()
export class AuthService {
    private logger=new Logger('AuthService');
    constructor(
        @InjectRepository(UserRespository)
        private userRepository: UserRespository,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
        const userName = await this.userRepository.validateUserPassword(authCredentialsDto);
        if (!userName) {
            throw new UnauthorizedException('Invalid credentials');
        } else {
            const payload: JwtPayload = { userName };
            const token = await this.jwtService.sign(payload);
            this.logger.debug(`Generated JWt Token with payload ${JSON.stringify(payload)}`);
            return { token }
        }
    }
}
