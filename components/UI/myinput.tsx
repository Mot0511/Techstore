import React from 'react';

const Myinput = (props: any) => {
    return (
        <div className={`${props.classes && props.classes} input-group mb-2`}>
            <span className="input-group-text">{props.text}</span>
            <input id={props.id} type="text" className="form-control" {...props} onChange={e => props.callback(e.target.value)}/>
        </div>
    );
};

export default Myinput;