import { forwardRef, Module } from '@nestjs/common';
import { BasketModule } from 'src/basket/basket.module';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopItem]),
    forwardRef(() => BasketModule),
  ],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
