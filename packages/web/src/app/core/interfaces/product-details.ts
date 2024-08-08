export interface ProductDetails {
  id: number;
  categoryId: number;
  arName: string;
  enName: string;
  arDescription: string;
  enDescription: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: Image[];
}
export interface Category {
  id: number;
  categoryId: number;
  arName: string;
  enName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: number;
  productId: number;
  imageUrl: string;
  createdAt: string;
}
