import ItemType from "../types/ItemType";
import {AppStore, RootReducerType} from "../store";
import {CartSlice} from "../store/reducers/CartSlice";
import {arrayUnion, doc, updateDoc} from "@firebase/firestore";
import {store} from "./getApp";
import {TypedUseSelectorHook} from "react-redux";

const {addItem, removeItem, setCount} = CartSlice.actions

export const addCartItem = (item: ItemType, dispatch: AppStore['dispatch'], login: string) => {
    const cartItem = {id: item.id, name: item.name, count: '1', price: item.price}
    dispatch(addItem(cartItem))
    updateDoc(doc(store, 'carts', login), {
        items: arrayUnion(cartItem)
    })
}