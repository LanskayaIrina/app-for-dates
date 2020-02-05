import React from "react";
import Portal from "../portal/Portal";
import style from "./ModalMessage.module.css"

const Modal = ({title, isOpen, onModalCancel, onModalSubmit, modalRef}) => {

    return (
        <>
            {isOpen &&
            <Portal>
                <div className={style.modalOverlay} ref={modalRef}>
                    <div className={style.modalWindow}>
                        <div className={style.modalHeader}>
                            <div className={style.modalTitle}>{title}</div>
                        </div>
                        <div className={style.modalBody}>
                            <button onClick={onModalSubmit} className="yes-btn">Yes</button>
                            <button onClick={onModalCancel} className="no-btn">No</button>
                            <button onClick={onModalCancel} className="ok-btn hidden">Ok</button>
                        </div>
                    </div>
                </div>
            </Portal>
            }
        </>
    )
};


export default Modal;