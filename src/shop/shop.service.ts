import {
  forwardRef,
  Get,
  Inject,
  Injectable,
  Param,
  Redirect,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketService } from 'src/basket/basket.service';
import { GetListOfProductsResponse } from 'src/interfaces/interfaces';
import { Repository } from 'typeorm';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private readonly basketService: BasketService,
    @InjectRepository(ShopItem)
    private readonly shopItemRepository: Repository<ShopItem>,
  ) {}

  async getListOfProducts(): Promise<GetListOfProductsResponse> {
    return await this.shopItemRepository.find();
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getListOfProducts()).some(
      (product) => product.name === name,
    );
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getListOfProducts()).find(
      (product) => product.name === name,
    ).price;
  }
  async getOneProduct(id: string): Promise<ShopItem> {
    return await this.shopItemRepository.findOneBy({ id });
  }

  async removeProduct(id: string): Promise<void> {
    await this.shopItemRepository.delete(id);
  }

  async createDummyProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();
    newItem.name = 'test';
    newItem.price = 100;
    newItem.description = 'test';
    await this.shopItemRepository.save(newItem);
    return newItem;
  }

  async addBoughtCount(id: string): Promise<void> {
    this.shopItemRepository.update(id, { boughtCount: 1 });
    const item = await this.shopItemRepository.findOneBy({ id });
    if (!item) {
      return;
    }
    item.boughtCount++;
    await this.shopItemRepository.save(item);
  }

  @Get('/test')
  @Redirect()
  testRedirect(@Param('age') age: string) {
    const url = Number(age) > 18 ? '/test2' : '/test3';
    return { url, statusCode: 301 };
  }
}
