import {combineReducers} from "redux";
import {HYDRATE} from "next-redux-wrapper";
import brandsReducer from "./fetched/brandsSlice";
import modelsReducer from "./fetched/modelsReducer";
import generationsReducer from "./fetched/generationsReducer";
import detailsReducer from "./fetched/detailsReducer";
import productsReducer from "./fetched/productsReducer";
import reviewsReducer from "./fetched/reviewsReducer";
import modalResponseReducer from './sended/modalResponseSlice'
import variationsReducer from './fetched/variationsReducer'


export  const rootReducer = combineReducers({
    brandsReducer,
    modelsReducer,
    generationsReducer,
    detailsReducer,
    productsReducer,
    reviewsReducer,
    modalResponseReducer,
    variationsReducer,
})

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        if (state.count) nextState.count = state.count; // preserve count value on client side navigation
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};


export type RootState = ReturnType<typeof rootReducer>