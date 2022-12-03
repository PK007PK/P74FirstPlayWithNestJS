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
  GetBasketStatsResponse,
  GetTotalPriceResponse,
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

  @Get('/:userId')
  checkBasket(@Body() userId: string): Promise<ItemInBasket[]> {
    return this.basketService.getAllForUser(userId);
  }

  @Get('/admin')
  checkBasketForAdmin(): Promise<ItemInBasket[]> {
    return this.basketService.getAllForAdmin();
  }

  @Post('/')
  addProductToBasket(
    @Body() item: addProductDto,
  ): Promise<AddProductToBasketResponse> {
    return this.basketService.addProduct(item);
  }

  @Delete('/:id/:userId')
  removeProductFromBasket(
    @Param('itemInBasketId') itemInBasketId: string,
    @Param('userId') userId: string,
  ): Promise<RemoveProductFromBasketResponse> {
    return this.basketService.remove(itemInBasketId, userId);
  }

  @Delete('/all/:userId')
  clearBasket(
    @Param('userId') userId: string,
  ): Promise<RemoveProductFromBasketResponse> {
    return this.basketService.clearBasket(userId);
  }

  @Get('/total-price/:userId')
  getTotalPrice(@Body() userId: string): Promise<GetTotalPriceResponse> {
    return this.basketService.getTotalPrice(userId);
  }

  @Get('/stats')
  getStats(): Promise<GetBasketStatsResponse> {
    return this.basketService.getStats();
  }
}
