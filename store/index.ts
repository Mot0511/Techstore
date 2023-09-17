import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ItemsSlice from "./reducers/ItemsSlice";
import {unknown} from "zod";
import UserSlice from "./reducers/UserSlice";


const rootReducer = combineReducers({
    items: ItemsSlice,
    user: UserSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootReducerType = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type DispatchType = AppStore['dispatch']