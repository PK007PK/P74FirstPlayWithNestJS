import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  ListProductInBasketResponse,
  RemoveProductFromBasketResponse,
} from 'src/interfaces/basket';
import { ShopService } from 'src/shop/shop.service';
import { addProductDto } from './dto/add-product.dto';

@Injectable()
export class BasketService {
  private items: addProductDto[] = [];

  constructor(
    @Inject(forwardRef(() => ShopService))
    private readonly shopService: ShopService,
  ) {}

  checkBasket(): ListProductInBasketResponse {
    return this.items;
  }

  addProduct(item: addProductDto): AddProductToBasketResponse {
    const { name, count, id } = item;
    if (
      typeof name !== 'string' ||
      typeof count !== 'number' ||
      count <= 0 ||
      name === '' ||
      !this.shopService.hasProduct(name)
    ) {
      return {
        isSuccess: false,
      };
    }

    this.items.push(item);
    console.log(this.items);

    this.shopService.addBoughtCount(id);

    return {
      isSuccess: true,
      index: this.items.length - 1,
    };
  }

  removeProduct(index: number): RemoveProductFromBasketResponse {
    const { length } = this.items;
    if (index < 0 || index >= length) {
      return {
        isSuccess: false,
      };
    }

    this.items.splice(index, 1);
    console.log(this.items);

    return {
      isSuccess: true,
    };
  }

  async getTotalPrice(): Promise<GetTotalPriceResponse> {
    if (!this.items.every((item) => this.shopService.hasProduct(item.name))) {
      const alternativeBasket = this.items.filter((item) =>
        this.shopService.hasProduct(item.name),
      );
      return {
        isSuccess: false,
        alternativeBasket,
      };
    }
    return (
      await Promise.all(
        this.items.map(
          async (item) =>
            (await this.shopService.getPriceOfProduct(item.name)) * item.count,
        ),
      )
    ).reduce((a, b) => a + b, 0);
  }

  async countPromo(): Promise<number> {
    return (await this.getTotalPrice()) > 10 ? 1 : 0;
  }
}
