import React, {useEffect, useRef, useState} from 'react';
import cl from '../styles/cart.module.sass'
import CartItem from "./cartItem";
import Mybutton from "./UI/mybutton";
import Myinput from "./UI/myinput";
import Myselect from "./UI/myselect";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useRouter} from "next/router";
import {useAppDispatch} from "../hooks/useTypedDispatch";
import {OrdersSlice} from "../store/reducers/OrdersSlice";
import {getRef} from "../services/getApp";
import {get, set} from "@firebase/database";
import {useCookies} from "react-cookie";
import OrderType from "../types/OrderType";

const Cart = ({user}: {user: string}) => {
    const router = useRouter()
    const {items, isLoading, error} = useTypedSelector(states => states.cart)
    const dispatch = useAppDispatch()
    const {addOrder} = OrdersSlice.actions
    const [cookies] = useCookies()
    const [name, setName] = useState('Матвей')
    const [point, setPoint] = useState(0)
    const [points, setPoints] = useState([])
    // const [payway, setPayway] = useState(0)

    let sum: number = 0
    items.map(item => {
        sum += item.price * Number(item.count)
    })

    const order =  () => {
        const orderId = Math.floor(Math.random() * 9999)
        const order: OrderType = {items: items, orderId: orderId, status: 0, name: name, point: points[point], user: cookies.login}
        dispatch(addOrder(order))
        set(getRef(`/orders/${cookies.login}/${orderId}`), order)
        router.push(`/order/${orderId}`)
    }
    useEffect(() => {
        get(getRef('/points')).then(snap => setPoints(snap.val()))
    }, [])
    return (
        <div className={cl.cart}>
            <h2>Корзина</h2>
            <div className={cl.list}>
                {
                    items.length
                        ? items.map(item => <CartItem item={item} count={item.count}  />)
                        : <h4>Корзина пуста</h4>
                }
            </div>
            <hr/>
            <div className={cl.cartFooter}>
                <p className={cl.sum}>Итого: {sum} руб.</p>
                <Myinput text={'Ваше имя'} value={name} callback={setName} required />
                <Myselect text={'Пункт выдачи'} options={points.map(point => point)} callback={setPoint}/>
                {/*<Myselect text={'Способ оплаты'} options={['При получении']} callback={setPayway}/>*/}
            </div>
            <Mybutton fullwidth={true} onClick={order}>Оформить заказ</Mybutton>
        </div>
    );
};

export default Cart;