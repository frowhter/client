import {BrandsState} from "../../../types/fetchedData/brands";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICar} from "../../../types/fetchedData/cars";


const initialState: BrandsState = {
    brands: [],
    isLoading: false,
    error: ''
}


export const brandsSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {
        brandsFetching(state){
            state.isLoading = true;
        },
        brandsFetchingSuccess(state, action: PayloadAction<ICar[]>){
            state.isLoading = false;
            state.error = ''
            state.brands = action.payload
        },
        brandsFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload
        },

    },
})

export default brandsSlice.reducer;

