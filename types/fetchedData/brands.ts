import {ICar} from "./cars";


export interface BrandsState {
    brands: ICar[];
    isLoading: boolean;
    error: string;
}
