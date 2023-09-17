import React from 'react';
import Head from "next/head";
import cl from '../styles/MainContainer.module.sass'
import Link from "next/link";
import Mybutton from "./UI/mybutton";
import {signWithGoogle} from "../services/signWithGoogle";
import {useRouter} from "next/router";

interface MainContainerProps {
    title: string,
    children: React.ReactNode
}

const MainContainer = ({title, children}: MainContainerProps) => {

    const router = useRouter()

    const signin = () => {
        signWithGoogle((access, username) => {
            if (access) {
                router.push(`/users/${username}`)
            }
        })
    }

    return (
            <div className={'container'}>
                <Head>
                    <title>{title}</title>
                    <script src="https://apis.google.com/js/platform.js" async defer></script>
                </Head>
                <div className={cl.header}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2"><h2>TechStore</h2></div>
                            <div className="col-lg-8">
                                <div className={cl.menu}>
                                    <Link href={'/'}>Главная</Link>
                                    <Link href={'/categories/phones'}>Телефоны</Link>
                                    <Link href={'/categories/notebooks'}>Ноутбуки</Link>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <Mybutton onClick={signin}>Войти</Mybutton>
                            </div>
                    </div>

                    </div>
                    <hr/>
                </div>
                <div>
                    {children}
                </div>
            </div>
    );
};

export default MainContainer;