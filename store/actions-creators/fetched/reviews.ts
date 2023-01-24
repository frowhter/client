import {fetchReviews} from "../../../htttp/razboroAPI";
import {AppDispatch} from "../../index";
import {reviewsSlice} from "../../reducers/fetched/reviewsReducer";


export const FetchReviews = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(reviewsSlice.actions.reviewsFetching())
        const response = await fetchReviews()
        dispatch(reviewsSlice.actions.reviewsFetchingSuccess(response))
    } catch (e) {
        dispatch(reviewsSlice.actions.reviewsFetchingError(e.message))
    }
}