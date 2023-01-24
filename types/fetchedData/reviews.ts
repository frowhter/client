

export interface IReview{
    id: number;
    name: string;
    img: string;
    text: string;
    star: number;
    status: string;
    'minus-days': number;
}

export interface ReviewsState {
    reviews: IReview[];
    isLoading: boolean;
    error: string;
}
