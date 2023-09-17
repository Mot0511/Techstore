import React from 'react';
import cl from "../../styles/UI/mybutton2.module.sass";

const Mybutton2 = (props: any) => {
    const styles = {}
    if (props.fullwidth){
        styles['width'] = '100%'
    }
    if (props.active){
        styles['backgroundColor'] = 'lightgrey'
    }
    return (
        <button style={styles} className={cl.button} {...props}>{props.children}</button>
    );
};

export default Mybutton2;