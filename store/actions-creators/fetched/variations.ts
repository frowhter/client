import {fetchVariations} from "../../../htttp/razboroAPI";
import {AppDispatch} from "../../index";
import {variationsSlice} from "../../reducers/fetched/variationsReducer";


export const FetchVariations = (brand: string, model: string, detail: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(variationsSlice.actions.variationsFetching())
        const response = await fetchVariations(brand, model, detail)
        dispatch(variationsSlice.actions.variationsFetchingSuccess(response))
    } catch (e) {
        dispatch(variationsSlice.actions.variationsFetchingError(e.message))
    }
}