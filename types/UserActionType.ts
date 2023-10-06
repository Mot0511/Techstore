import UserType from "./UserType";

interface FetchItemsAction {
    type: any,
}
interface FetchItemsSuccessAction {
    type: any,
    payload: UserType
}
interface FetchItemsErrorAction {
    type: any,
    payload: boolean
}

export type UserActionType = FetchItemsAction | FetchItemsSuccessAction | FetchItemsErrorAction