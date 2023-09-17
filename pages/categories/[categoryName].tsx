import React, {useEffect, useState} from 'react';
import MainContainer from "../../components/MainContainer";
import ItemType from '../../types/ItemType'
import Item from "../../components/item";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ItemsPropsType} from "../../types/ItemsPropsType";
import {fetchList} from "../../services/fetchList";
import {get, ref} from "@firebase/database";
import {db} from "../../services/getApp";
import {fetchItemsTransform} from "../../transformes/fetchItemsTransform";
import axios from "axios";
import {useParams} from "next/navigation";
import {useAppDispatch} from "../../hooks/useTypedDispatch";
import {fetchItems} from "../../services/fetchItems";

const ItemPage = ({categoryName}: ItemsPropsType) => {

    const [title, setTitle] = useState('Techstore')
    const {items, isLoading, error, category} = useTypedSelector(states => states.items)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchItems(categoryName, res => {
            setTitle(res)
        }))
    }, [categoryName])

    return (
        <MainContainer title={title}>

            <div className="container">
                <h1>{category && category}</h1>
                <div className="row my-4">
                    {
                        isLoading
                            ? <h2>Идет загрузка...</h2>
                            : error
                                ? <h2>{error}</h2>
                                : items
                                    ? items.map(item => {
                                        return <Item id={item.id} name={item.name} vendor={item.vendor} description={item.description} img={item.img} key={item.id} price={item.price} />
                                    })
                                : ''
                    }
                </div>
            </div>
        </MainContainer>
    );
};

export default ItemPage;

export const getServerSideProps = async (context: any) => {
    let category = context.params.categoryName
    return {props: {categoryName: category}}
}