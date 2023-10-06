import React from 'react';
import MainContainer from "../components/MainContainer";
import Cart from "../components/cart";

const cartPage = ({user}: {user: string}) => {
    return (
        <MainContainer title={'Корзина'}>
            <Cart user={user} />
        </MainContainer>
    );
};

export default cartPage;