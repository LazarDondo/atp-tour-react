import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import './Modal.css';

const Modal = ({ children, isOpen, handleClose, title }) => {

    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
        const onBodyClick = (e) => handleClose();
        document.body.addEventListener("keydown", closeOnEscapeKey);
        document.body.addEventListener('click', onBodyClick);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
            document.body.removeEventListener('click', onBodyClick);
        };
    }, [handleClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-container">
            <div className="modal-container-content"  onClick={(e)=>e.stopPropagation()}>
                <h3 id="title" className="header-content">{title}</h3>
                {children}
                <CloseButton className="header-content" onClick={handleClose} />
            </div>
        </div>
        , document.querySelector('#modal')
    );
}
export default Modal;