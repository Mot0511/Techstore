import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../store";


export const useTypedSelector: TypedUseSelectorHook<RootReducerType> = useSelector