import { Controller, Get } from '@nestjs/common';
import { GetListOfProductsResponse } from 'src/interfaces/interfaces';

@Controller('shop')
export class ShopController {
  @Get('/')
  getListOfProducts(): GetListOfProductsResponse {
    return [
      { name: 'Ogórki kiszone', description: 'Bardzo dobre ogórki', price: 10 },
      { name: 'Seler naciowy', description: 'Smaczny i zdrowy', price: 3 },
      { name: 'Lody waniliowe', description: 'Całkowicie wegańskie', price: 7 },
    ];
  }
}
