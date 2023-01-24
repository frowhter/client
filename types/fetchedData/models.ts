import {ICar} from "./cars";


export interface ModelsState {
    models: ICar[];
    isLoading: boolean;
    error: string;
}

