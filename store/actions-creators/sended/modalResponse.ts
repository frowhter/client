import {AppDispatch} from "../../index";
import {modalResponseSlice} from "../../reducers/sended/modalResponseSlice";

export const sendResponse = (message) => (dispatch: AppDispatch) => {
    try {
        dispatch(modalResponseSlice.actions.modalResponseFetchingSuccess(message))
    } catch (e) {
        dispatch(modalResponseSlice.actions.modalResponseFetchingError(e.message))
    }
}

