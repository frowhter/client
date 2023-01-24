



// create a makeStore function
import {createWrapper} from "next-redux-wrapper";

import {reducer} from "./reducers";
import {configureStore} from "@reduxjs/toolkit";

const setupStore = () => {
    return configureStore({
        reducer: reducer
    })
}


export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

// export an assembled wrapper
export const wrapper = createWrapper<AppStore>(setupStore, {debug: true});