import { forwardRef, Module } from '@nestjs/common';
import { ShopModule } from 'src/shop/shop.module';
import { UserModule } from 'src/user/user.module';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';

@Module({
  imports: [forwardRef(() => ShopModule), forwardRef(() => UserModule)],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
