import {IProduct, ProductsState} from "../../../types/fetchedData/product";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: ProductsState = {
    products: [],
    isLoading: false,
    error: ''
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsFetching(state){
            state.isLoading = true;
        },
        productsFetchingSuccess(state, action: PayloadAction<IProduct[]>){
            state.isLoading = false;
            state.error = ''
            state.products = action.payload
        },
        productsFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload
        },

    },
})

export default productsSlice.reducer;