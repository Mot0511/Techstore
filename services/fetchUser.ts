import {Dispatch} from "redux";
import {UserActionType} from "../types/UserActionType";
import {UserSlice} from "../store/reducers/UserSlice";
import {db} from "./getApp";
import {get, ref} from "@firebase/database";
import {UserType} from "../types/UserType";

export const fetchUser = (username: string) => {
    const {fetchUser, fetchUserSuccess, fetchUserError} = UserSlice.actions
    return (dispatch: Dispatch<UserActionType>) => {
        dispatch(fetchUser(''))
        get(ref(db, `users/${username}/`)).then(snap => {
            const data: UserType = snap.val()
            dispatch(fetchUserSuccess(data))
        }).catch(e => {
            dispatch(fetchUserError(false))
        })
    }
}