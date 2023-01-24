export interface IVariation{
    id: number;
    cat_id: number;
    text: string;
}



export interface VariationsState {
    variations: IVariation[];
    isLoading: boolean;
    error: string;
}