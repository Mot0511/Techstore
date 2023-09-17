import ItemType from "./ItemType";

interface FetchItemsAction {
    type: any,
}
interface FetchItemsSuccessAction {
    type: any,
    payload: ItemType[],
}
interface FetchItemsErrorAction {
    type: any,
    payload: string,
}

export type ItemsActionType = FetchItemsAction | FetchItemsSuccessAction | FetchItemsErrorAction