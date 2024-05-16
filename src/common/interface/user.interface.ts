export interface IUser {
  id: string;
  email: string;
  name: string;
  cart: ICartItem[];
}

export interface ICartItem {
  productID: string;
  quantity: number;
}
