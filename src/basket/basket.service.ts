import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  RemoveProductFromBasketResponse,
} from 'src/interfaces/basket';
import { ShopService } from 'src/shop/shop.service';
import { addProductDto } from './dto/add-product.dto';
import { ItemInBasket } from './item-in-basket.entity';
import { ShopItem } from 'src/shop/shop-item.entity';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService))
    private readonly shopService: ShopService,
  ) {}

  async checkBasket(): Promise<ItemInBasket[]> {
    return await ItemInBasket.find({
      relations: ['shopItem'],
    });
  }

  async addProduct(
    product: addProductDto,
  ): Promise<AddProductToBasketResponse> {
    const { id, count } = product;

    const shopItem = await ShopItem.findOne({ where: { id } });
    if (
      typeof id !== 'string' ||
      typeof count !== 'number' ||
      id === '' ||
      count <= 0 ||
      !(await this.shopService.hasProduct(id))
    ) {
      return {
        isSuccess: false,
      };
    }

    const item = new ItemInBasket();
    item.count = count;
    await item.save();

    this.shopService.addBoughtCount(id);

    item.shopItem = shopItem;
    await item.save();

    return {
      isSuccess: true,
      id: item.id,
    };
  }

  async removeProduct(id: string): Promise<RemoveProductFromBasketResponse> {
    const item = await ItemInBasket.findOne({ where: { id } });
    if (item) {
      await item.remove();
    }
    ItemInBasket.delete(id);
    return {
      isSuccess: true,
    };
  }

  async getTotalPrice(): Promise<GetTotalPriceResponse> {
    const items = await ItemInBasket.find();
    const price = (
      await Promise.all(
        items.map(async (item) => (item.shopItem.price * item.count) / 100),
      )
    ).reduce((a, b) => a + b, 0);
    if (price) {
      return price;
    } else {
      return {
        isSuccess: false,
        alternativeBasket: items,
      };
    }
  }

  async countPromo(): Promise<number> {
    return (await this.getTotalPrice()) > 10 ? 1 : 0;
  }

  async clearBasket() {
    await ItemInBasket.delete({});
  }
}
