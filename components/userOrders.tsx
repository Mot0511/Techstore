import React, {useEffect} from 'react';
import cl from '../styles/orders.module.sass'
import {useTypedSelector} from "../hooks/useTypedSelector";
import Order from "./order";
import {getRef} from "../services/getApp";
import {onValue} from "@firebase/database";
import {useCookies} from "react-cookie";
import {useAppDispatch} from "../hooks/useTypedDispatch";
import {OrdersSlice} from "../store/reducers/OrdersSlice";
import OrderType from "../types/OrderType";

const UserOrders = () => {
    const {orders} = useTypedSelector(states => states.orders)
    const dispatch = useAppDispatch()
    const {addOrders} = OrdersSlice.actions
    const [cookies] = useCookies()


    useEffect(() => {
        onValue(getRef(`/orders/${cookies.login}/`), snap => {
            const data = snap.val()
            const array: OrderType[] = []
            for (let i in data){
                array.push(data[i])
            }
            dispatch(addOrders(array))
        })
    }, []);

    return (
        <div className={cl.orders}>
            {
                orders.map(order => <Order order={order} key={Date.now()} isAdmin={false}/>)
            }
        </div>
    );
};

export default UserOrders;