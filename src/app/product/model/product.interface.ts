export interface Product {
  category: string;
  description: string;
  price: number;
  title: string;
  image: string;
}

export interface ProductId extends Product {
  id: string;
}
