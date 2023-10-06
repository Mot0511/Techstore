import React from 'react';
import MainContainer from "../../components/MainContainer";
import Mybutton from "../../components/UI/mybutton";
import Link from "next/link";
import {useCookies} from "react-cookie";

const OrderId = ({orderId}: {orderId: string}) => {

    const [cookies] = useCookies()
    const login = cookies.login

    return (
        <MainContainer title={'Номер заказа: '+orderId}>
            <center>
                <h2 style={{fontSize: '40px'}}>Номер вашего заказа:</h2>
                <h1 style={{fontSize: '70px'}}>{orderId}</h1>
                <Link href={`/users/${login}`}><Mybutton>Перейти в мой профиль</Mybutton></Link>
            </center>
        </MainContainer>
    );
};
export default OrderId;

export const getServerSideProps = ({params}: any) => {

    return {props: {orderId: params.orderId}}
}