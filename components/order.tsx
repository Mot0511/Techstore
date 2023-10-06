import React from 'react';
import cl from '../styles/order.module.sass'
import CartItemType from "../types/CartItemType";
import Item from "./item";
import OrderType from "../types/OrderType";

const Order = ({order}: {order: OrderType}) => {
    let sum: number = 0
    order.items.map(item => {
        sum += item.price * Number(item.count)
    })
    return (
        <div>
            <div className={cl.orderHeader} style={{marginBottom: '50px'}}>
                <h1>Заказ: {order.orderId}</h1>
                <p>{order.point}</p>
                <hr/>
                <div className="container">
                    <div className="row">
                        {
                            order.items.map(item => <Item item={item} type={'none'} />)
                        }
                    </div>
                </div>
                <hr/>
                <h1>Сумма: {sum} руб.</h1>

            </div>
        </div>
    );
};

export default Order;