import {ModelsState} from "../../../types/fetchedData/models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICar} from "../../../types/fetchedData/cars";


const initialState: ModelsState = {
    models: [],
    isLoading: false,
    error: ''
}

export const modelsSlice = createSlice({
    name: 'models',
    initialState,
    reducers: {
        modelsFetching(state){
            state.isLoading = true;
        },
        modelsFetchingSuccess(state, action: PayloadAction<ICar[]>){
            state.isLoading = false;
            state.error = ''
            state.models = action.payload
        },
        modelsFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload
        },

    },
})

export default modelsSlice.reducer;