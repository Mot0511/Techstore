import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {OrdersState} from "../../types/StateTypes";
import OrderType from "../../types/OrderType";

const initialState: OrdersState = {
    orders: [],
    isLoading: false,
    error: false
}

export const OrdersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrders(state, action: PayloadAction<OrderType[]>){
            state.orders = action.payload
        },
        addOrder(state, action: PayloadAction<OrderType>){
            state.orders = [...state.orders, action.payload]
        },
        removeOrder(state, action: PayloadAction<number>){
            state.orders = state.orders.filter(order => order.orderId != action.payload)
        }
    }
})

export default OrdersSlice.reducer