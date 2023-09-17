import React, {useEffect} from 'react';
import MainContainer from "../../components/MainContainer";
import Multipager from "../../components/UI/multipager";
import Myitems from "../../components/myitems";
import Orders from "../../components/orders";
import {useAppDispatch} from "../../hooks/useTypedDispatch";
import {fetchUser} from "../../services/fetchUser";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Cart from "../../components/cart";
import UserOrders from "../../components/userOrders";

const User = ({username}: any) => {

    const dispatch = useAppDispatch()
    const {user, isLoading, error} = useTypedSelector(states => states.user)
    const multiPager = user.level == 0 ? <Multipager pages={[['Заказы', <Orders />], ['Товары', <Myitems />]]}/> : user.level == 1 ? <Multipager pages={[['Заказы', <Orders />]]}/> : <Multipager pages={[['Мои заказы', <UserOrders />], ['Корзина', <Cart />]]}/>

    useEffect(() => {
        dispatch(fetchUser(username))
    }, [username]);

    return (
        <MainContainer title={'Профиль пользователя'}>
            {
                isLoading
                    ? <h2>Идет загрузка...</h2>
                    : error
                        ? <h2>Произошла ошибка</h2>
                        : multiPager

            }

        </MainContainer>
    );
};

export default User;

export const getServerSideProps = async ({params}: any) => {
    return {props: {username: params.user}}
}