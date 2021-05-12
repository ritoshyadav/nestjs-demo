import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '172.17.0.2',
    port: 5432,
    username: 'postgres',
    password: 'Pass2020!',
    database: 'nest_demo',
    entities: [join(__dirname, '/../','**','/*.entity.{ts,js}')],
    synchronize: true
}