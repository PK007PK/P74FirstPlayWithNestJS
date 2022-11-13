import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketModule } from './basket/basket.module';
import { FoxController } from './fox/fox.controller';
import { FoxService } from './fox/fox.service';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [ShopModule, BasketModule],
  controllers: [AppController, FoxController],
  providers: [AppService, FoxService],
})
export class AppModule {}
