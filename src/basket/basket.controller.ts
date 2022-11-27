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
import { ItemInBasket } from './item-in-basket.entity';

@Controller('basket')
export class BasketController {
  constructor(
    @Inject(BasketService) private readonly basketService: BasketService,
  ) {}

  @Get('/')
  checkBasket(): Promise<ItemInBasket[]> {
    return this.basketService.checkBasket();
  }

  @Post('/')
  addProductToBasket(
    @Body() item: addProductDto,
  ): Promise<AddProductToBasketResponse> {
    return this.basketService.addProduct(item);
  }

  @Delete('/:id')
  removeProductFromBasket(
    @Param('id') id: string,
  ): Promise<RemoveProductFromBasketResponse> {
    return this.basketService.removeProduct(id);
  }

  @Get('total-price')
  getTotalPrice(): Promise<GetTotalPriceResponse> {
    return this.basketService.getTotalPrice();
  }
}
