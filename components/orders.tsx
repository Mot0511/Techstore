import React, {useEffect, useState} from 'react';
import cl from '../styles/orders.module.sass'
import {useTypedSelector} from "../hooks/useTypedSelector";
import Order from "./order";
import {getRef} from "../services/getApp";
import {get, onValue} from "@firebase/database";
import OrderType from "../types/OrderType";

const Orders = () => {
    const [orders, setOrders] = useState<OrderType[]>([])
    const formOrders = (obj: any) => {
        const array: OrderType[] = []
        for (let i in obj){
            for (let j in obj[i]){
                array.push(obj[i][j])
            }
        }
        setOrders(array)
    }
    useEffect(() => {
        get(getRef('/orders/')).then(snap => {
            formOrders(snap.val())
        })
        onValue(getRef('/orders/'), snap => {
            formOrders(snap.val())
        })
    }, []);
    return (
        <div className={cl.orders}>
            {
                orders.map(order => <Order order={order} key={order.orderId} isAdmin={true} />)
            }
        </div>
    );
};

export default Orders;