import React, {useState} from 'react';
import cl from "../styles/cartItem.module.sass";
import Mybutton from "./UI/mybutton";
import {CartSlice} from "../store/reducers/CartSlice";
import {useAppDispatch} from "../hooks/useTypedDispatch";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {arrayUnion, doc, updateDoc} from "@firebase/firestore";
import {store} from "../services/getApp";
import {useCookies} from "react-cookie";

const CartItem = ({item, count}: any) => {
    const [countText, setCountText] = useState(count)
    const {setCount, removeItem} = CartSlice.actions
    const dispatch = useAppDispatch()
    const items = useTypedSelector(states => states.cart.items)
    const [cookies] = useCookies()

    return (
        <div className={cl.item + ' block'}>
            <div className={cl.itemHeading}>
                <h4>{item.name}</h4>
            </div>
            <div className={cl.itemData}>
                <b>{item.price} руб.</b>
                <input type="number" value={count} onChange={e => {
                    dispatch(setCount([item.id, e.target.value]))
                }} className={'form-control'} style={{width: '100px'}} />
                <p>шт.</p>

            </div>
            <Mybutton classes={cl.delBtn} onClick={() => {
                const tmp = items.filter(el => el.id != item.id)
                updateDoc(doc(store, 'carts', cookies.login), {
                    items: tmp
                })
                dispatch(removeItem(item.id))
            }}>Удалить</Mybutton>
        </div>
    );
};

export default CartItem;