import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {state} from "sucrase/dist/types/parser/traverser/base";
import ItemType from "../../types/ItemType";
import {fetchItems} from "../../services/fetchItems";
import {ItemsState} from "../../types/StateTypes";


const initialState: ItemsState = {
    items: [],
    isLoading: false,
    error: '',
    category: '',
}
export const ItemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        fetchItems(state, action: PayloadAction<any> ) {
            state.isLoading = true
            state.items
        },
        fetchItemsSuccess(state, action: PayloadAction<[ItemType[], string]>) {
            state.isLoading = false
            state.items = action.payload[0]
            state.category = action.payload[1]
        },
        fetchItemsError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        }
    },
})



export default ItemsSlice.reducer