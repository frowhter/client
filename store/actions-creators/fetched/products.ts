import {fetchProducts, fetchProductsRandom} from "../../../htttp/razboroAPI";
import {AppDispatch} from "../../index";
import {productsSlice} from "../../reducers/fetched/productsReducer";


export const FetchProducts = (brand: string, model: string, detail: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(productsSlice.actions.productsFetching())
        const response = await fetchProducts(brand, model, detail)
        dispatch(productsSlice.actions.productsFetchingSuccess(response))
    } catch (e) {
        dispatch(productsSlice.actions.productsFetchingError(e.message))
    }
}

export const FetchProductsRandom = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productsSlice.actions.productsFetching())
        const response = await fetchProductsRandom()
        dispatch(productsSlice.actions.productsFetchingSuccess(response))
    } catch (e) {
        dispatch(productsSlice.actions.productsFetchingError(e.message))
    }
}