import {
  forwardRef,
  Get,
  Inject,
  Injectable,
  Param,
  Redirect,
} from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { GetListOfProductsResponse } from 'src/interfaces/interfaces';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private readonly basketService: BasketService,
  ) {}

  getListOfProducts(): GetListOfProductsResponse {
    return [
      {
        name: 'Ogórki kiszone',
        description: 'Bardzo dobre ogórki',
        price: 10 - this.basketService.countPromo(),
      },
      { name: 'Seler naciowy', description: 'Smaczny i zdrowy', price: 3 },
      { name: 'Lody waniliowe', description: 'Całkowicie wegańskie', price: 7 },
    ];
  }

  hasProduct(name: string): boolean {
    return this.getListOfProducts().some((product) => product.name === name);
  }

  getPriceOfProduct(name: string): number {
    return this.getListOfProducts().find((product) => product.name === name)
      .price;
  }

  @Get('/test')
  @Redirect()
  testRedirect(@Param('age') age: string) {
    const url = Number(age) > 18 ? '/test2' : '/test3';
    return { url, statusCode: 301 };
  }
}
