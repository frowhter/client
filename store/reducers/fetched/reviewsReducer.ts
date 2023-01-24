import {IReview, ReviewsState} from "../../../types/fetchedData/reviews";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: ReviewsState = {
    reviews: [],
    isLoading: false,
    error: ''
}

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        reviewsFetching(state){
            state.isLoading = true;
        },
        reviewsFetchingSuccess(state, action: PayloadAction<IReview[]>){
            state.isLoading = false;
            state.error = ''
            state.reviews = action.payload
        },
        reviewsFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload
        },

    },
})

export default reviewsSlice.reducer;