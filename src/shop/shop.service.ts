import { Injectable } from '@nestjs/common';
import { GetListOfProductsResponse } from 'src/interfaces/interfaces';

@Injectable() // <--- This decorator is required for dependency injection
export class ShopService {
  // <--- This class is a services
  getListOfProducts(): GetListOfProductsResponse {
    return [
      { name: 'Ogórki kiszone', description: 'Bardzo dobre ogórki', price: 10 },
      { name: 'Seler naciowy', description: 'Smaczny i zdrowy', price: 3 },
      { name: 'Lody waniliowe', description: 'Całkowicie wegańskie', price: 7 },
    ];
  }
}
