import React, {useEffect, useState} from 'react';
import cl from '../styles/myitems.module.sass'
import {app, db, getRef, itemsRef, storage} from "../services/getApp";
import {get, onValue, ref, set, update} from "@firebase/database";
import {useAppDispatch} from "../hooks/useTypedDispatch";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {fetchItems} from "../services/fetchItems";
import Item from "./item";
import Mybutton from "./UI/mybutton";
import Modal from "./modal";
import Myinput from "./UI/myinput";
import {ref as storageRef, getStorage, uploadBytes, getDownloadURL} from "@firebase/storage";
import Myselect from "./UI/myselect";
import {fetchList} from "../services/fetchList";
import {doc, setDoc} from "@firebase/firestore";
import {ItemsSlice} from "../store/reducers/ItemsSlice";

const Myitems = () => {

    const {items, isLoading, error} = useTypedSelector(states => states.items)
    const {addItem: uploadItem, removeItem} = ItemsSlice.actions
    const dispatch = useAppDispatch()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState('')
    const [category, setCategory] = useState(0)
    const [list, setList] = useState<string[]>([])
    const [categoryName, setCateogryName] = useState('')

    const [isCreatingCategory, setIsCreatingCategory] = useState(false)

    const updatePage = () => {
        dispatch(fetchItems())
        fetchList((list, error) => {
            setList(list)
            return {}
        })
    }

    useEffect(() => {
        updatePage()
    }, [])

    const addItem = () => {
        const id = Date.now()
        // @ts-ignore
        const file = (document.getElementById('img') as HTMLInputElement).files[0]
        uploadBytes(storageRef(storage, String(id)+'.png'), file)
            .then(async (snapshot) => {
                const item = {
                    id: id,
                    vendor: id,
                    name: name,
                    description: description,
                    price: price,
                    category: Number(category),
                }
                await setDoc(itemsRef(String(id)), item);
                dispatch(uploadItem(item))
                })
  }
    const addCategory = async () => {
        const tmp = list
        tmp.push(categoryName)
        console.log(tmp);
        await set(getRef('/list'), tmp)
        setCategory(tmp.indexOf(tmp[-1]))
        updatePage()

    }

    return (
        <div className={cl.myitems}>
            <Modal heading={'Добавление товара'} btnText={'Добавить товар'} id={'addItemModal'} callback={addItem}>
                <Myinput text={'Название'} callback={setName} value={name} />
                <Myinput text={'Описание'} callback={setDescription} value={description} />
                <div className="row">
                    <Myinput text={'Цена (руб.)'} className={'col-lg-3 form-control'} callback={setPrice} value={price} />
                </div>

                <Myinput text={'Изображение'} onChange={() => {
                    // @ts-ignore
                    setImg(document.getElementById('file').files[0])
                }} id={'img'} type={'file'} callback={setImg} value={img} />
                <Myselect text={'Категория'} callback={setCategory} options={list} value={category} />
                <div className="row">
                    <a onClick={() => setIsCreatingCategory(true)} className={'col-lg-6'}>Создать категорию</a>
                    {/*<a href="" className={'col-lg-6'}>Удалить категорию</a>*/}
                </div>
                {
                    isCreatingCategory && <>
                        <Myinput text={'Название категории'} callback={setCateogryName} value={categoryName} classes={'my-2'}/>
                        <a onClick={addCategory}>Добавить</a>
                    </>
                }
            </Modal>
            <div className={cl.list}>
                <div className="row">
                    <div className="col-lg-2">
                        <h1>Товары</h1>
                    </div>
                    <div className="col-lg-10 my-2">
                        <Mybutton data-bs-toggle="modal" data-bs-target="#addItemModal">Добавить товар</Mybutton>
                    </div>
                </div>


                <div className="row">
                    {
                        isLoading
                            ? <h3>Идет загрузка...</h3>
                            : error
                                ? <h3>Произошла ошибка</h3>
                                : items.map(item => {
                                    return <Item item={item} type={'admin'} update={updatePage}/>
                                })
                    }
                </div>

            </div>
        </div>
    );
};

export default Myitems;