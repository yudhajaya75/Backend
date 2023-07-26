import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ProtectMiddleware } from './protect.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'konseling',
      entities: [Users],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ProtectMiddleware], // Add ProtectMiddleware to providers
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProtectMiddleware).forRoutes('api/user'); // Update the route as needed
  }
}
