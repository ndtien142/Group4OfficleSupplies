export interface IProduct {
  id: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  title: string;
}

export interface IProductPromotional {
  id: string;
  brand: string;
  description: string;
  image: string;
  price: number;
  title: string;
  salePrice: number;
}
