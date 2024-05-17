export interface IProduct {
  id: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  title: string;
  status: string;
}

export interface IProductPromotional {
  id: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  title: string;
  salePrice: number;
  status: string;
}
