import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ItemsSlice from "./reducers/ItemsSlice";
import {unknown} from "zod";
import UserSlice from "./reducers/UserSlice";
import CartSlice from "./reducers/CartSlice";
import OrdersSlice from "./reducers/OrdersSlice";


const rootReducer = combineReducers({
    items: ItemsSlice,
    user: UserSlice,
    cart: CartSlice,
    orders: OrdersSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootReducerType = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type DispatchType = AppStore['dispatch']