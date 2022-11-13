import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketModule } from './basket/basket.module';
import { FoxController } from './fox/fox.controller';
import { FoxService } from './fox/fox.service';
import { ShopModule } from './shop/shop.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ShopModule, BasketModule, UsersModule],
  controllers: [AppController, FoxController],
  providers: [AppService, FoxService],
})
export class AppModule {}
