export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  status: ProductStatus;
  imageUrl: string;
  rating: number;
  stockCount: number;
}
