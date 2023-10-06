import React from 'react';
import cl from '../styles/orders.module.sass'
import {useTypedSelector} from "../hooks/useTypedSelector";
import Order from "./order";

const UserOrders = () => {
    const {orders} = useTypedSelector(states => states.orders)

    return (
        <div className={cl.orders}>
            {
                orders.map(order => <Order order={order} />)
            }
        </div>
    );
};

export default UserOrders;