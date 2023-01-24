import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IVariation, VariationsState} from "../../../types/fetchedData/variations";


const initialState: VariationsState = {
    variations: [],
    isLoading: false,
    error: ''
}

export const variationsSlice = createSlice({
    name: 'variations',
    initialState,
    reducers: {
        variationsFetching(state){
            state.isLoading = true;
        },
        variationsFetchingSuccess(state, action: PayloadAction<IVariation[]>){
            state.isLoading = false;
            state.error = ''
            state.variations = action.payload
        },
        variationsFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload
        },

    },
})

export default variationsSlice.reducer;