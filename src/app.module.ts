import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketModule } from './basket/basket.module';
import { FoxController } from './fox/fox.controller';
import { FoxService } from './fox/fox.service';
import { ShopModule } from './shop/shop.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sklepnestjs',
      entities: ['dist/**/**.entity{.ts,.js}'],
      bigNumberStrings: false,
      logging: true,
      synchronize: true,
    }),
    ShopModule,
    BasketModule,
    UsersModule,
  ],
  controllers: [AppController, FoxController],
  providers: [AppService, FoxService],
})
export class AppModule {}
