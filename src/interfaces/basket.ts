import { addProductDto } from 'src/basket/dto/add-product.dto';

export type AddProductToBasketResponse =
  | { isSuccess: true; index: number }
  | { isSuccess: false };

export interface RemoveProductFromBasketResponse {
  isSuccess: boolean;
}

export type ListProductInBasketResponse = addProductDto[];

export type GetTotalPriceResponse =
  | number
  | { isSuccess: false; alternativeBasket: addProductDto[] };
