import { Injectable } from '@nestjs/common';
import { addProductDto } from './dto/add-product.dto';

@Injectable()
export class BasketService {
  private items: addProductDto[];

  addProduct(item: addProductDto) {
    this.items.push(item);

    return {
      isSuccess: true,
      index: this.items.length - 1,
    };
  }
}
