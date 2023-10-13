import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {OrdersState} from "../../types/StateTypes";
import OrderType from "../../types/OrderType";
import {getItemById} from "../../services/getItemById";
import {getOrderById} from "../../services/getOrderById";

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
        },
        // setStatus(state, action: PayloadAction<[number, number]>){
        //     console.log(current(state).orders);
        //     const order = getOrderById(current(state).orders, action.payload[0])
        //     order['status'] = action.payload[1]
        //     state.orders = [...state.orders, order]
        // }
    }
})

export default OrdersSlice.reducer