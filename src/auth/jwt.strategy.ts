import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interace";
import { User } from "./user.entity";
import { UserRespository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRespository)
        private userRespository: UserRespository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecretTimeline',
        })
    }
    async validate(payload: JwtPayload): Promise<User> {
        const { userName } = payload;
        const user = await this.userRespository.findOne({ userName });
        if (!user) {
            throw new UnauthorizedException()
        }
        return user;
    }
}
// export calss JwtStrategy extends PassportStrategy(Strategy){
//     construtor(){

//     }
// }