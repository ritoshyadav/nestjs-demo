import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    TaskModule
  ]
})
export class AppModule { }
