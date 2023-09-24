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
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
                </Head>
                <div className={cl.header}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2"><h2>TechStore</h2></div>
                            <div className="col-lg-8">
                                <div className={cl.menu}>
                                    <Link href={'/'}>Главная</Link>
                                    <Link href={'/categories/1'}>Телефоны</Link>
                                    <Link href={'/categories/0'}>Ноутбуки</Link>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="row">
                                    <div className="col-lg">
                                        <Mybutton onClick={signin}>Войти</Mybutton>

                                    </div>
                                </div>

                            </div>


                    </div>

                    </div>
                    <hr/>
                </div>
                <div className={cl.content}>
                    {children}
                </div>
                <hr/>
                <div className={cl.footer}>
                    <a onClick={() => {
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
                    }}}>Вход для сотрудников</a>
                </div>
            </div>
    );
};

export default MainContainer;