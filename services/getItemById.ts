import ItemType from "../types/ItemType";
import CartItemType from "../types/CartItemType";

export const getItemById = (list: CartItemType[], id: number) => {
    return list.filter(el => el.id == id)[0]
}