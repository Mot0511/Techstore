import React, {useEffect, useMemo, useState} from 'react';
import MainContainer from "../../components/MainContainer";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {getItemById} from "../../services/getItemById";
import {fetchItems} from "../../services/fetchItems";
import {useAppDispatch} from "../../hooks/useTypedDispatch";
import ItemType from "../../types/ItemType";
import {getDownloadURL, ref as storageRef} from "@firebase/storage";
import {storage} from "../../services/getApp";
import cl from "../../styles/product.module.sass";
import Mybutton from "../../components/UI/mybutton";
import {addCartItem} from "../../services/CartService";
import {useCookies} from "react-cookie";

const Id = ({id}: {id: number}) => {
    const dispatch = useAppDispatch()
    const {items, isLoading} = useTypedSelector(states => states.items)
    const [item, setItem] = useState<ItemType>()
    const isInCart = useTypedSelector(states => {
        if (states.cart.items.filter(el => el.id == item?.id).length) {
            return true
        }
    })
    const [cover, setCover] = useState('')
    const [cookies] = useCookies()
    const getItems = async () => {
        dispatch(fetchItems())
    }
    useEffect(() => {
        getItems()
    }, [])
    useEffect(() => {
        if (!isLoading){
            setItem(items.filter(el => el.id == id)[0])
        }
    }, [isLoading])
    useEffect(() => {
        if (item){
            getDownloadURL(storageRef(storage, item.id+'.png')).then(async (url) => {
                setCover(url)
            })
        }
    }, [item]);


    return (
        <MainContainer title={item ? item.name : 'Techstore'}>
            {
                item && <div className={'container ' + cl.productContent}>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className={cl.cover} id={'img'} style={{backgroundImage: `url(${cover})`}}></div>
                        </div>
                        <div className="col-lg-8">
                            <h1>{item.name}</h1>
                            <p>{item.description}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <h1 className={cl.price}>Цена: {item.price} руб.</h1>
                            {
                                !isInCart
                                    ? <Mybutton fullwidth={true} onClick={() => addCartItem(item, dispatch, cookies.login)}>В корзину</Mybutton>
                                    : <p>В корзине</p>
                            }
                        </div>
                    </div>
                </div>
            }

        </MainContainer>
    );
};

export default Id;

export const getServerSideProps = ({params}: any) => {
    return {props: {id: params.id}}
}