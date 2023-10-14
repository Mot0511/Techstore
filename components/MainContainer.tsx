import React, {useEffect, useState} from 'react';
import Head from "next/head";
import image from "next/image";
import cl from '../styles/MainContainer.module.sass'
import Link from "next/link";
import Mybutton from "./UI/mybutton";
import {signWithGoogle} from "../services/signWithGoogle";
import {useRouter} from "next/router";
import {app, getRef, store} from "../services/getApp";
import {get} from "@firebase/database";
import {useCookies} from "react-cookie";
import {signOut} from "@firebase/auth";
import {getAuth} from "firebase/auth";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {doc, getDoc} from "@firebase/firestore";
import {useAppDispatch} from "../hooks/useTypedDispatch";
import {CartSlice} from "../store/reducers/CartSlice";
import {OrdersSlice} from "../store/reducers/OrdersSlice";
import OrderType from "../types/OrderType";
interface MainContainerProps {
    title: string,
    children: React.ReactNode
}

const MainContainer = ({title, children}: MainContainerProps) => {
    const [domLoaded, setDomLoaded] = useState(false)
    const dispatch = useAppDispatch()
    const {addItems} = CartSlice.actions
    const {addOrders} = OrdersSlice.actions

    const router = useRouter()
    const [list, setList] = useState([])
    const [cookie, setCookie, removeCookie] = useCookies()
    const login = cookie.login && cookie.login.split('@')[0]
    const cartCount = useTypedSelector(states => states.cart.items.length)


    const signin = () => {
        signWithGoogle((access, username) => {
            if (access) {
                setCookie('login', username)
                router.push(`/users/${username}`)
            }
        })
    }

    const getCart = async () => {
        const cartSnap = await getDoc(doc(store, 'carts', cookie.login))
        if (cartSnap.exists()){
            dispatch(addItems(cartSnap.data().items))
        }
    }
    const getOrders = async () => {
        get(getRef(`/orders/${cookie.login}/`)).then(snap => {
            const orders: OrderType[] = []
            const res = snap.val()
            for (let id in res){
                orders.push(res[id])
            }
            dispatch(addOrders(orders))
        })
    }

    const onStart = () => {
        setDomLoaded(true);
        get(getRef('list/')).then(res => {
            setList(res.val())
        })
        if (cookie.login){
            getCart()
            getOrders()
        }
    }

    useEffect(() => {
        onStart()
    }, [])

    const logout = () => {
        signOut(getAuth(app)).then(() => {
            removeCookie('login')
            window.location.reload()
            router.push('/')
        })
    }

    // @ts-ignore
    return (
        <>
            {
                domLoaded && <div className={'container'}>
                    <Head>
                        <title>{title}</title>
                        <script src="https://apis.google.com/js/platform.js" async defer></script>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
                    </Head>
                    <div className={cl.header}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-2"><h2>TechStore</h2></div>
                                <div className="col-lg-6">
                                    <div className={cl.menu}>
                                        <Link href={'/'}>Главная</Link>
                                        {
                                            list.map(el => <Link href={`/categories/${list.indexOf(el)}`} key={Date.now()}>{el}</Link>)
                                        }
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="row">
                                        <div className="col-lg">
                                            <div className={cl.headerBtns}>

                                                {
                                                    login
                                                        ? <>
                                                        <div className={cl.cartContainer}>
                                                            <Link href="/cartPage"><img className={cl.cart} src="https://i.pinimg.com/originals/f2/12/4e/f2124e83e9fd8ddeb31ac7cdb59f544c.jpg" alt=""/></Link>
                                                            <p className={cl.cartCount}>{cartCount}</p>
                                                        </div>
                                                            <Mybutton onClick={() => router.push(`/users/${login}`)}>Профиль</Mybutton>
                                                            <Mybutton onClick={logout}>Выйти</Mybutton>
                                                        </>
                                                        : <Mybutton onClick={signin}>Войти</Mybutton>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className={cl.hr}/>
                    </div>
                    <div className={cl.content}>
                        {children}
                    </div>
                    <hr/>
                    <div className={cl.footer}>
                        <p onClick={() => {
                            const code = prompt('Код для входа')
                            switch (code){
                                case '1':
                                    console.log(1);
                                    router.push(`/users/admin`)
                                    break
                                case '2':
                                    console.log(2);
                                    router.push(`/users/worker`)
                                    break
                            }}}>Вход для сотрудников</p>
                    </div>
                </div>
            }
        </>


    );
};

export default MainContainer;