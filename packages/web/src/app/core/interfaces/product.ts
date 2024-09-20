export interface Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageUrl: any;
  enName: string;
  price: string;
  category: CategoryProduct;
  images: Image[];
  id?: number;
  categoryId?:number;
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
