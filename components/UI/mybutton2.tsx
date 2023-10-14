import React from 'react';
import cl from "../../styles/UI/mybutton2.module.sass";

const Mybutton2 = (props: any) => {
    const styles: {width: string, backgroundColor: string} = {width: 'auto', backgroundColor: 'none'}
    if (props.fullwidth){
        styles['width'] = '100%'
    }
    if (props.active){
        styles['backgroundColor'] = 'lightgrey'
    }
    return (
        <button key={Date.now()} style={styles} className={cl.button} {...props}>{props.children}</button>
    );
};

export default Mybutton2;