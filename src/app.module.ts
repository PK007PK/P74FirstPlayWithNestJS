import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoxController } from './fox/fox.controller';
import { ShopController } from './shop/shop.controller';
import { ShopService } from './shop/shop.service';
import { FoxService } from './fox/fox.service';
import { BasketController } from './basket/basket.controller';
import { BasketService } from './basket/basket.service';

@Module({
  imports: [],
  controllers: [AppController, FoxController, ShopController, BasketController],
  providers: [AppService, ShopService, FoxService, BasketService],
})
export class AppModule {}
