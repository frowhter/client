import {DetailsState} from "../../../types/fetchedData/details";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICar} from "../../../types/fetchedData/cars";


const initialState: DetailsState = {
    details: [],
    isLoading: false,
    error: ''
}

export const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        detailsFetching(state){
            state.isLoading = true;
        },
        detailsFetchingSuccess(state, action: PayloadAction<ICar[]>){
            state.isLoading = false;
            state.error = ''
            state.details = action.payload
        },
        detailsFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload
        },

    },
})

export default detailsSlice.reducer;