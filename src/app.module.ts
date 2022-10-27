import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoxController } from './fox/fox.controller';
import { ShopController } from './shop/shop.controller';

@Module({
  imports: [],
  controllers: [AppController, FoxController, ShopController],
  providers: [AppService],
})
export class AppModule {}
