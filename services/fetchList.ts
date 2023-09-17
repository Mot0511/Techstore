import {get, ref} from "@firebase/database";
import {db} from "./getApp";
import {list} from "postcss";
import ItemType from "../types/ItemType";


export const fetchList = (callback: (list: {}, error: string) => {}) => {
    get(ref(db, 'list/')).then(snap => {
        callback(snap.val(), '')
    }).catch(error => {
        callback([], error)
    })
}