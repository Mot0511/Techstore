import React, {useEffect, useState} from 'react';
import MainContainer from "../components/MainContainer";
import ItemType from '../types/ItemType'
import Item from "../components/item";
import {db} from "../services/getApp";
import {ref, set} from "@firebase/database";
import {fetchItems} from "../services/fetchItems";
import {GetServerSideProps, GetStaticProps} from "next";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch, useSelector} from "react-redux";
import ItemsState from "../store/reducers/ItemsSlice";
import Mybutton from "../components/UI/mybutton";
import {useAppDispatch} from "../hooks/useTypedDispatch";
import axios from "axios";


const Index = () => {
    const {items, isLoading, error} = useTypedSelector(states => states.items)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchItems())
    }, [])

    return (
        <MainContainer title={'Главная'}>

            <div className="container">
                <h1>Новинки</h1>
                <div className="row my-4">
                    {
                        error && <h2>{error}</h2>
                    }
                    {
                        isLoading
                            ? <h2>Идет загрузка...</h2>
                            : items.length
                                ? items.map(item => {
                                    return <Item item={item} key={item.id}/>
                                })
                            : <></>
                    }

                </div>
            </div>
        </MainContainer>
    );
};

export default Index;
