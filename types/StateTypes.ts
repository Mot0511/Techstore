import ItemType from "./ItemType";
import {UserType} from "./UserType";

export interface ItemsState {
    items: ItemType[],
    isLoading: boolean,
    error: null | string,
    category: string,
}

export interface UserState {
    user: UserType,
    isLoading: boolean,
    error: boolean,
}