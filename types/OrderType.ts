import CartItemType from "./CartItemType";

export default interface OrderType {
    items: CartItemType[]
    orderId: number
    status: number
    name: string
    point: string
}