import React from 'react';
import cl from '../styles/order.module.sass'
import CartItemType from "../types/CartItemType";
import Item from "./item";
import OrderType from "../types/OrderType";
import Mybutton from "./UI/mybutton";
import {useAppDispatch} from "../hooks/useTypedDispatch";
import {OrdersSlice} from "../store/reducers/OrdersSlice";
import {remove, set} from "@firebase/database";
import {getRef} from "../services/getApp";
import {useCookies} from "react-cookie";

const Order = ({order, isAdmin}: {order: OrderType, isAdmin: boolean}) => {
    const [cookies] = useCookies()
    const dispatch = useAppDispatch()
    const {removeOrder} = OrdersSlice.actions
    let sum: number = 0
    order.items.map(item => {
        sum += item.price * Number(item.count)
    })

    const delOrder = () => {
        const orderId = order.orderId
        remove(getRef(`/orders/${order.user}/${order.orderId}`))
        dispatch(removeOrder(orderId))
    }
    const status = (statusNum: number) => {
        set(getRef(`/orders/${order.user}/${order.orderId}/status`), statusNum)
    }
    return (
        <div>
            <div className={cl.orderHeader} style={{marginBottom: '50px'}}>
                <h1>Заказ: {order.orderId}</h1>
                <p>{order.point}</p>
                <Mybutton onClick={delOrder}>Удалить заказ</Mybutton>
                <hr/>
                <div className="container">
                    <div className="row">
                        {
                            order.items.map(item => <Item item={item} type={'none'} key={Date.now()} />)
                        }
                    </div>
                </div>
                    {
                        order.status == 0
                            ? <p className={cl.status} style={{color: '#cc8100'}}>Собирается...</p>
                            : order.status == 1
                                ? <p className={cl.status} style={{color: '#006fc9'}}>В пути...</p>
                                : order.status == 2
                                    ? <p className={cl.status} style={{color: 'green'}}>Готов к выдаче</p>
                                    : order.status == 3 && <p className={cl.status} style={{color: 'red'}}>Отменен</p>
                    }
                {
                    isAdmin && <div className="btn-group" role="group" aria-label="Установка статуса заказа">
                        <input type="radio" className="btn-check" name="btnradio" id={'status'+order.orderId+'0'} autoComplete="off" onClick={() => status(0)} />
                        <label className="btn btn-outline-dark" htmlFor={'status'+order.orderId+'0'}>Собирается</label>

                        <input type="radio" className="btn-check" name="btnradio" id={'status'+order.orderId+'1'} autoComplete="off" onClick={() => status(1)}/>
                        <label className="btn btn-outline-primary" htmlFor={'status'+order.orderId+'1'}>В пути</label>

                        <input type="radio" className="btn-check" name="btnradio" id={'status'+order.orderId+'2'} autoComplete="off" onClick={() => status(2)} />
                        <label className="btn btn-outline-success" htmlFor={'status'+order.orderId+'2'}>Готов к выдаче</label>

                        <input type="radio" className="btn-check" name="btnradio" id={'status'+order.orderId+'3'} autoComplete="off" onClick={() => status(3)} />
                        <label className="btn btn-outline-danger" htmlFor={'status'+order.orderId+'3'}>Отменить</label>
                    </div>
                }

                <hr/>
                <h1>Сумма: {sum} руб.</h1>

            </div>
        </div>
    );
};

export default Order;