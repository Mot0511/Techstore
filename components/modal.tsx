import React from 'react';
import Mybutton from "./UI/mybutton";

const Modal = ({heading, id, btnText, children, callback}: any) => {
    return (
        <div className="modal fade" id={id} aria-labelledby="addItemModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addItemModalLabel">{heading}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <Mybutton onClick={callback}>{btnText}</Mybutton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;