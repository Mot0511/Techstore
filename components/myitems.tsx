import React from 'react';
import cl from '../styles/myitems.module.sass'

const Myitems = () => {
    return (
        <div className={cl.myitems}>
            <div className={cl.list}>
                <h2>List of items</h2>
            </div>
        </div>
    );
};

export default Myitems;