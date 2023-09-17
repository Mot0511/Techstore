import React from 'react';
import cl from '../../styles/UI/mybutton.module.sass'

const Mybutton = (props: any) => {
    return (
        <div>
            <button style={props.fullwidth ? {width: '100%'} : {}} className={cl.button} {...props}>{props.children}</button>
        </div>
    );
};

export default Mybutton;