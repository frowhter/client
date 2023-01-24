import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ModalResponseState} from "../../../types/sendedData/modalResponse";

const initialState: ModalResponseState = {
    response: '',
    isLoading: false,
    visible: false,
    error: '',
    close: null,
}


export const modalResponseSlice = createSlice({
    name: 'modalResponse',
    initialState,
    reducers: {
        modalResponseFetching(state){
            state.isLoading = true;
            state.visible = true;
        },
        modalResponseFetchingSuccess(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.visible = true;
            state.error = ''
            state.response = action.payload
        },
        modalResponseFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.visible = true;
            state.error = action.payload
        },
        modalResponseSetVisible(state, action: PayloadAction<boolean>){
            state.visible = action.payload
        },
        modalResponseClose(state, action: PayloadAction<()=>void>){
            state.close = action.payload
        }

    },
})

export default modalResponseSlice.reducer;