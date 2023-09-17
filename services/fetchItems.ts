import {ItemsSlice} from "../store/reducers/ItemsSlice"
import {Dispatch} from "redux";
import {ItemsActionType} from "../types/ItemsActionType";
import {get, ref} from "@firebase/database";
import {db} from "./getApp";
import {PayloadAction} from "@reduxjs/toolkit";
import ItemType from "../types/ItemType";
import {fetchItemsTransform} from "../transformes/fetchItemsTransform";
import {fetchList} from "./fetchList";


export const fetchItems = (category: string | null = null, callback = (title: string) => undefined) => {
    const {fetchItems, fetchItemsSuccess, fetchItemsError} = ItemsSlice.actions;
    return (dispatch: Dispatch<ItemsActionType>) => {
        dispatch(fetchItems(''))
        try {
            get(ref(db, `categories/${category ? category + '/' : ''}`)).then(snap => {

                const data = snap.val()
                fetchList((list, error: string) => {

                    if (error){
                        dispatch(fetchItemsError('Не удалось загрузить товары'))
                        return {}
                    }
                    // @ts-ignore
                    callback(list[category])
                    // @ts-ignore
                    dispatch(fetchItemsSuccess(category ? [data, list[category]] : [fetchItemsTransform(data), '']))

                    return {}
                })


            }).catch(e => {
                dispatch(fetchItemsError('Не удалось загрузить товары'))
                return
            })
        } catch (e) {
            dispatch(fetchItemsError('Не удалось загрузить товары'))
        }
    }
}