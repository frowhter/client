import {fetchBrand} from "../../../htttp/razboroAPI";
import {AppDispatch} from "../../index";
import {brandsSlice} from "../../reducers/fetched/brandsSlice";


export const FetchBrands = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(brandsSlice.actions.brandsFetching())
        const response = await fetchBrand()
        dispatch(brandsSlice.actions.brandsFetchingSuccess(response))
    } catch (e) {
        dispatch(brandsSlice.actions.brandsFetchingError(e.message))
    }
}