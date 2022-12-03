import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  AddProductToBasketResponse,
  GetBasketStatsResponse,
  GetTotalPriceResponse,
  RemoveProductFromBasketResponse,
} from 'src/interfaces/basket';
import { ShopService } from 'src/shop/shop.service';
import { addProductDto } from './dto/add-product.dto';
import { ItemInBasket } from './item-in-basket.entity';
import { ShopItem } from 'src/shop/shop-item.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService))
    private readonly shopService: ShopService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(DataSource) private dataSource: DataSource,
  ) {}

  async getAllForUser(userId: string): Promise<ItemInBasket[]> {
    const user = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return await ItemInBasket.find({
      where: { user: { id: userId } },
      relations: ['shopItem'],
    });
  }

  async getAllForAdmin(): Promise<ItemInBasket[]> {
    return await ItemInBasket.find({
      relations: ['shopItem', 'user'],
    });
  }

  async addProduct(
    product: addProductDto,
  ): Promise<AddProductToBasketResponse> {
    const { productId, userId, count } = product;

    const shopItem = await ShopItem.findOne({ where: { productId } });
    const user = await this.userService.getOneUser(userId);

    if (
      typeof productId !== 'string' ||
      typeof userId !== 'string' ||
      typeof count !== 'number' ||
      productId === '' ||
      userId === '' ||
      count <= 0 ||
      !(await this.shopService.hasProduct(productId)) ||
      !user
    ) {
      return {
        isSuccess: false,
      };
    }

    const item = new ItemInBasket();
    item.count = count;
    await item.save();

    this.shopService.addBoughtCount(productId);

    item.shopItem = shopItem;
    await item.save();

    return {
      isSuccess: true,
      id: item.id,
    };
  }

  async remove(
    itemInBasketId: string,
    userId: string,
  ): Promise<RemoveProductFromBasketResponse> {
    const user = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const item = await ItemInBasket.findOne({
      where: { id: itemInBasketId, user: { id: userId } },
    });

    if (item) {
      await item.remove();
    }
    ItemInBasket.delete(itemInBasketId);
    return {
      isSuccess: true,
    };
  }

  async clearBasket(userId: string): Promise<RemoveProductFromBasketResponse> {
    const user = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found');
    }
    await ItemInBasket.delete({
      user: { id: userId },
    });
    return {
      isSuccess: true,
    };
  }

  async getTotalPrice(userId: string): Promise<GetTotalPriceResponse> {
    const items = await this.getAllForUser(userId);
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

  async countPromo(userId: string): Promise<number> {
    return (await this.getTotalPrice(userId)) > 10 ? 1 : 0;
  }

  async getStats(): Promise<GetBasketStatsResponse> {
    // Sposób A
    const { itemInBasketAvgPrice } = await this.dataSource
      .createQueryBuilder()
      .select('AVG(shopItem.price)', 'itemInBasketAvgPrice')
      .from(ItemInBasket, 'itemInBasket')
      .leftJoinAndSelect('itemInBasket.shopItem', 'shopItem')
      .getRawOne();

    // Sposób B
    const allItemsInBasket = await this.getAllForAdmin();
    const baskets: any = {};

    for (const oneItemInBasket of allItemsInBasket) {
      baskets[oneItemInBasket.user.id] = baskets[oneItemInBasket.user.id] || [];
      baskets[oneItemInBasket.user.id] +=
        oneItemInBasket.shopItem.price * oneItemInBasket.count * 1.23;
    }

    const basketValues: any = Object.values(baskets);
    const basketAvgTotalPrice =
      basketValues.reduce((a, b) => a + b, 0) / basketValues.length;

    return {
      itemInBasketAvgPrice: itemInBasketAvgPrice,
      basketAvgTotalPrice: basketAvgTotalPrice,
    };
  }
}
