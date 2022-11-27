export interface ShopItemInterface {
  id: string;
  name: string;
  description: string;
  price: number;
}

export type GetListOfProductsResponse = ShopItemInterface[];

export type GetOneProductResponse = ShopItemInterface;

export type CreateProductResponse = ShopItemInterface;
