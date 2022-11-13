import { Inject, Body, Controller, Post } from '@nestjs/common';
import { BasketService } from './basket.service';
import { addProductDto } from './dto/add-product.dto';

@Controller('basket')
export class BasketController {
  constructor(
    @Inject(BasketService) private readonly basketService: BasketService,
  ) {}

  @Post('/')
  addProductToBasket(@Body() item: addProductDto) {
    return this.basketService.addProduct(item);
  }
}
