import ItemType from "./ItemType";
import UserType from "./UserType";
import CartItemType from "./CartItemType";
import OrderType from "./OrderType";

export interface ItemsState {
    items: ItemType[]
    isLoading: boolean
    error: null | string
    category: string
}

export interface UserState {
    user: UserType
    isLoading: boolean
    error: boolean
}

export interface CartType {
    items: CartItemType[]
    isLoading: boolean
    error: boolean
}

export interface OrdersState {
    orders: OrderType[]
    isLoading: boolean
    error: boolean
}