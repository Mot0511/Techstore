import React from 'react';
import ItemType from "../types/ItemType";
import cl from '../styles/item.module.sass'
import Mybutton from "./UI/mybutton";

const Item = ({id, vendor, img, description, name, price}: ItemType) => {
    return (
        <div className={cl.item + ' col-lg-4'}>
            <div className={cl.cover} style={{backgroundImage: `url(${img})`}}></div>
            <h4>{name}</h4>
            <p>{price}</p>
            <Mybutton fullwidth={true}>В корзину</Mybutton>
        </div>
    );
};

export default Item;