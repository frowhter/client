import {GenerationsState, IGeneration} from "../../../types/fetchedData/generations";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: GenerationsState = {
    generations: [],
    isLoading: false,
    error: ''
}

export const generationsSlice = createSlice({
    name: 'generations',
    initialState,
    reducers: {
        generationsFetching(state){
            state.isLoading = true;
        },
        generationsFetchingSuccess(state, action: PayloadAction<IGeneration[]>){
            state.isLoading = false;
            state.error = ''
            state.generations = action.payload
        },
        generationsFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload
        },

    },
})

export default generationsSlice.reducer;