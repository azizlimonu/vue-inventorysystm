// Generated by https://quicktype.io

export interface IProductsResponse {
    products: IProductsResponseData[];
}

export interface IProductsResponseData {
    id:          number;
    name:        string;
    description: string;
    stock:       number;
    slug:        string;
    price:       number;
    image:       string;
    category:    Category;
    createdAt:   string;
}

export interface Category {
    id:         number;
    name:       string;
    slug:       string;
    created_at: string;
    updated_at: string;
}

