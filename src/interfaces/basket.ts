import { addProductDto } from 'src/basket/dto/add-product.dto';

export type AddProductToBasketResponse =
  | { isSuccess: true; id: string }
  | { isSuccess: false };

export interface RemoveProductFromBasketResponse {
  isSuccess: boolean;
}

export type ListProductInBasketResponse = addProductDto[] | null;

export type GetTotalPriceResponse =
  | number
  | { isSuccess: false; alternativeBasket: addProductDto[] };
