import {ItemsSlice} from "../store/reducers/ItemsSlice"
import {Dispatch} from "redux";
import {ItemsActionType} from "../types/ItemsActionType";
import {get, ref} from "@firebase/database";
import {db, store} from "./getApp";
import {PayloadAction} from "@reduxjs/toolkit";
import ItemType from "../types/ItemType";
import {fetchItemsTransform} from "../transformes/fetchItemsTransform";
import {fetchList} from "./fetchList";
import {collection, getDocs, query, where} from "@firebase/firestore";


export const fetchItems = (category: number | null = null, callback = (title: string) => undefined) => {
    const {fetchItems, fetchItemsSuccess, fetchItemsError} = ItemsSlice.actions;
    return async (dispatch: Dispatch<ItemsActionType>) => {
        dispatch(fetchItems(''))
        try {
            const items: any[] = []
            if (category == null) {
                const querySnap = await getDocs(collection(store, 'items'))
                querySnap.forEach(doc => {
                    items.push(doc.data())
                })
                dispatch(fetchItemsSuccess([items, '']))
                return
            } else{
                const q = query(collection(store, 'items'), where('category', '==', category))
                const querySnap = await getDocs(q)
                querySnap.forEach(doc => {
                    items.push(doc.data())
                })
                fetchList((list, error) => {
                    dispatch(fetchItemsSuccess([items, list[category]]))
                })

            }



            // get(ref(db, `categories/${category ? category + '/' : ''}`)).then(snap => {
            //
            //     const data = snap.val()
            //     fetchList((list, error) => {
            //         if (error){
            //             dispatch(fetchItemsError('Не удалось загрузить товары'))
            //             return {}
            //         }
            //         // @ts-ignore
            //         callback(list[category])
            //         // @ts-ignore
            //         dispatch(fetchItemsSuccess(category ? [data, list[category]] : [fetchItemsTransform(data), '']))
            //
            //     })
            //
            //
            // }).catch(e => {
            //     dispatch(fetchItemsError('Не удалось загрузить товары'))
            //     return
            // })
        } catch (e) {
            dispatch(fetchItemsError('Не удалось загрузить товары'))
        }
    }
}