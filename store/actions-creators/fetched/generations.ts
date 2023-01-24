import {fetchGenerations} from "../../../htttp/razboroAPI";
import {AppDispatch} from "../../index";
import {generationsSlice} from "../../reducers/fetched/generationsReducer";


export const FetchGenerations = (model: string) => async (dispatch: AppDispatch, ) => {
    try {
        dispatch(generationsSlice.actions.generationsFetching())
        const response = await fetchGenerations(model)
        dispatch(generationsSlice.actions.generationsFetchingSuccess(response))
    } catch (e) {
        dispatch(generationsSlice.actions.generationsFetchingError(e.message))
    }
}