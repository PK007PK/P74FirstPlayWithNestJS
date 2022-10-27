import { Controller, Get, Inject } from '@nestjs/common';
import { GetListOfProductsResponse } from 'src/interfaces/interfaces';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(
    @Inject(ShopService) private shopService: ShopService, // <--- Dependency injection
  ) {}

  @Get('/')
  getListOfProducts(): GetListOfProductsResponse {
    return this.shopService.getListOfProducts();
  }
}