import {
  Inject,
  Body,
  Controller,
  Post,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  ListProductInBasketResponse,
  RemoveProductFromBasketResponse,
} from 'src/interfaces/basket';
import { BasketService } from './basket.service';
import { addProductDto } from './dto/add-product.dto';

@Controller('basket')
export class BasketController {
  constructor(
    @Inject(BasketService) private readonly basketService: BasketService,
  ) {}

  @Get('/')
  checkBasket(): ListProductInBasketResponse {
    return this.basketService.checkBasket();
  }

  @Post('/')
  addProductToBasket(@Body() item: addProductDto): AddProductToBasketResponse {
    return this.basketService.addProduct(item);
  }

  @Delete('/:index')
  removeProductFromBasket(
    @Param('index') index: string,
  ): RemoveProductFromBasketResponse {
    console.log(index);

    return this.basketService.removeProduct(Number(index));
  }

  @Get('total-price')
  getTotalPrice(): GetTotalPriceResponse {
    return this.basketService.getTotalPrice();
  }
}
