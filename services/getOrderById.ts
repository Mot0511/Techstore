import OrderType from "../types/OrderType";

export const getOrderById = (list: OrderType[], id: number) => {
    return list.filter(el => el.orderId == id)[0]
}