import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserState} from "../../types/StateTypes";
import UserType from "../../types/UserType";


const initialState: UserState = {
    user: {
        username: '',
        email: '',
        level: 0
    },
    isLoading: false,
    error: false,
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUser(state, action: PayloadAction<any>){
            state.isLoading = true
        },
        fetchUserSuccess(state, action: PayloadAction<UserType>){
            state.isLoading = false
            state.user = action.payload
        },
        fetchUserError(state, action: PayloadAction<boolean>){
            state.isLoading = false
            state.error = true
        }
    }
})

export default UserSlice.reducer