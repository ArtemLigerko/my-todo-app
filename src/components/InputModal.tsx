import React from "react";
import './styles/InputModal.scss';

interface InputModalProps {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    children: any,
}

const InputModal: React.FC<InputModalProps> = ({ active, setActive, children }) => {
    return (
        <div
            className={active ? "modal__active" : "modal"}
            onClick={() => setActive(false)}
            onKeyPress={e => {
                // if (e.key === 'Enter') { setActive(false) };
            }}
        >
            <div
                className={active ? "modal__content__active" : "modal__content"}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default InputModal;