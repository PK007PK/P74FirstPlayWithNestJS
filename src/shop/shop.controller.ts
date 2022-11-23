import { Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import {
  CreateProductResponse,
  GetListOfProductsResponse,
  GetOneProductResponse,
} from 'src/interfaces/interfaces';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  async getListOfProducts(): Promise<GetListOfProductsResponse> {
    return this.shopService.getListOfProducts();
  }

  @Get('/:id')
  async getOneProduct(@Param('id') id: string): Promise<GetOneProductResponse> {
    return this.shopService.getOneProduct(id);
  }

  @Delete('/:id')
  async removeProduct(@Param('id') id: string): Promise<void> {
    this.shopService.removeProduct(id);
  }

  @Post('/')
  async createNewProduct(): Promise<CreateProductResponse> {
    return this.shopService.createDummyProduct();
  }
}
