import React from 'react';

const Myselect = (props: any) => {
    return (
        <div className="input-group mb-2">
            <span className="input-group-text">{props.text}</span>
            <select {...props} onChange={e => props.callback(e.target.value)} className="form-select">
                {
                    props.options.map((option: string[]) => <option value={props.options.indexOf(option)}>{option}</option>)
                }
            </select>
        </div>
        );
};

export default Myselect;