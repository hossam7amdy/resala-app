import { ListProductsResponse } from '@resala/shared';

export type Product = ListProductsResponse['data']['products'][number];

export interface CategoryProduct {
  enName: string;
  arName: string;
}

export interface Image {
  imageUrl: string;
}

/*


export interface Data {
  id: number
  categoryId: number
  arName: string
  enName: string
  arDescription: string
  enDescription: string
  price: string
  createdAt: string
  updatedAt: string
  category: Category
  images: Image[]
}

export interface Category {
  id: number
  categoryId: number
  arName: string
  enName: string
  createdAt: string
  updatedAt: string
}

export interface Image {
  id: number
  productId: number
  imageUrl: string
  createdAt: string
}


*/
