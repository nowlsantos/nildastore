export interface Product {
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
}

export interface ProductId extends Product {
  id: string;
}
