import {ICar} from "./cars";


export interface DetailsState {
    details: ICar[];
    isLoading: boolean;
    error: string;
}
