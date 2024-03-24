export interface Product {

    enName:string;
    price:string;
    category: CategoryProduct;
    images: Image[];

}


export interface CategoryProduct {

    enName:string;
}

export interface Image{
    imageUrl: string;
}

