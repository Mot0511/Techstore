import React, {useEffect, useState} from 'react';
import ItemType from "../types/ItemType";
import cl from '../styles/item.module.sass'
import Mybutton from "./UI/mybutton";
import {ref, remove} from "@firebase/database";
import {db, getRef, itemsRef, storage, store} from "../services/getApp";
import {fetchList} from "../services/fetchList";
import {deleteObject, getDownloadURL, ref as storageRef} from "@firebase/storage";
import {deleteDoc, doc} from "@firebase/firestore";
import {useAppDispatch} from "../hooks/useTypedDispatch";

const Item = ({item, type='main', update}: any) => {
    const [cover, setCover] = useState('')
    const dispatch = useAppDispatch()

    const removeItem = async (id: string) => {
        await deleteDoc(itemsRef(String(id)));
        deleteObject(storageRef(storage, item.id+'.png')).then(() => {
            update()
        })
    }
    useEffect(() => {
        getDownloadURL(storageRef(storage, item.id+'.png')).then(async (url) => {
            setCover(url)
        })
    }, [])
    return (
        <div className={cl.item + ' col-lg-4'}>
            <div className={cl.cover} id={'img'} style={{backgroundImage: `url(${cover})`}}></div>
            <h4>{item.name}</h4>
            <p>{item.price}</p>
            {
                type == 'main'
                    ? <Mybutton fullwidth={true}>В корзину</Mybutton>
                    : type == 'admin' && <Mybutton fullwidth={true} onClick={() => removeItem(item.id)}>Удалить</Mybutton>

            }
        </div>
    );
};

export default Item;