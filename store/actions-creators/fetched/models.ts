import {fetchModels} from "../../../htttp/razboroAPI";
import {AppDispatch} from "../../index";
import {modelsSlice} from "../../reducers/fetched/modelsReducer";


export const FetchModels = (brand: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(modelsSlice.actions.modelsFetching())
        const response = await fetchModels(brand)
        dispatch(modelsSlice.actions.modelsFetchingSuccess(response))
    } catch (e) {
        dispatch(modelsSlice.actions.modelsFetchingError(e.message))
    }
}