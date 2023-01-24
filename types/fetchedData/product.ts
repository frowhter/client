
export interface IProduct{
    id: number;
    name: string;
    cat_id: number
    content: string
    price: number
    img: string;
    code: string
    slug: string;
    active: number;
}



export interface ProductsState {
    products: IProduct[];
    isLoading: boolean;
    error: string;
}
