import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import CartItemType from "../../types/CartItemType";
import {CartType} from "../../types/StateTypes";
import {getItemById} from "../../services/getItemById";

const initialState: CartType = {
    items: [],
    isLoading: false,
    error: false,
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems(state, action: PayloadAction<CartItemType[]>){
            state.items = action.payload
        },
        addItem(state, action: PayloadAction<CartItemType>){
            state.items = [...state.items, action.payload]
        },
        removeItem(state, action: PayloadAction<number>){
            state.items = state.items.filter(item => item.id != action.payload)
        },
        setCount(state, action: PayloadAction<[number, string]>) {
            const newCount = action.payload[1]
            const id = action.payload[0]
            let cartId = 0
            while (cartId < state.items.length){
                if (state.items[cartId].id == id){
                    break
                }
                cartId++
            }
            if (newCount == '0' || Number(newCount) < 0){
                state.items[cartId].count = '0'
            } else if (newCount[0] == '0'){
                state.items[cartId].count = action.payload[1].substring(1)
            } else {
                state.items[cartId].count = action.payload[1]
            }

        },
    }
})

export default CartSlice.reducer