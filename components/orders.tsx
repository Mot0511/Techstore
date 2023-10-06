import React from 'react';
import cl from '../styles/orders.module.sass'
import {useTypedSelector} from "../hooks/useTypedSelector";
import Order from "./order";

const Orders = () => {
    const {orders} = useTypedSelector(states => states.orders)
    console.log(orders);
    return (
        <div className={cl.orders}>
            {
                orders.map(order => <Order order={order} />)
            }
        </div>
    );
};

export default Orders;