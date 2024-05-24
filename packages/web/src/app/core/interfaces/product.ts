export interface Product {
  enName: string;
  price: string;
  category: CategoryProduct;
  images: Image[];
  id?: number;
}

export interface CategoryProduct {
  enName: string;
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
  deletedAt: any
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
  deletedAt: any
}

export interface Image {
  id: number
  productId: number
  imageUrl: string
  createdAt: string
}


*/
