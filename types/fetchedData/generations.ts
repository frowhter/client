

export interface IGeneration {
    _id: number;
    parent_id: number;
    pokolenie: string;
    year_start: number;
    year_end: number;
    img: string;
}

export interface GenerationsState {
    generations: IGeneration[];
    isLoading: boolean;
    error: string;
}
