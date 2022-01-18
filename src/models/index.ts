export type Product = {
  id: string;
  price: number;
  label: string;
};

export type ShoppingCartItem = {
  productId: string;
  quantity: number;
};

export type ShoppingCartList = ShoppingCartItem[];
