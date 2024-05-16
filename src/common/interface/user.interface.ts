export interface IUser {
  id: string;
  email: string;
  name: string;
  cart: ICartItem[];
  orders: IOrder[];
}

export interface ICartItem {
  productID: string;
  quantity: number;
}

export interface IOrder {
  brand: string;
  date: string;
  productID: string;
  image: string;
  orderID: string;
  price: number;
  quantity: number;
  title: string;
  state: string;
}
