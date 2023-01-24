import {fetchDetails} from "../../../htttp/razboroAPI";
import {AppDispatch} from "../../index";
import {detailsSlice} from "../../reducers/fetched/detailsReducer";


export const FetchDetails = (brand: string, model: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(detailsSlice.actions.detailsFetching())
        const response = await fetchDetails(brand, model)
        dispatch(detailsSlice.actions.detailsFetchingSuccess(response))
    } catch (e) {
        dispatch(detailsSlice.actions.detailsFetchingError(e.message))
    }
}