//React:
import React, { FC, Dispatch, ReactNode } from "react";
//Styles:
import './styles/InputModal.scss';

interface InputModalProps {
    active: boolean,
    setActive: Dispatch<React.SetStateAction<boolean>>,
    children?: ReactNode,
}

const InputModal: FC<InputModalProps> = ({ active, setActive, children }) => {
    return (
        <div
            className={active ? "modal__active" : "modal"}
            onClick={() => setActive(false)}
            onKeyPress={e => {
                // if (e.key === 'Enter') { setActive(false) };
            }}
        >
            {children}
            <div
                className={active ? "modal__content__active" : "modal__content"}
                onClick={e => e.stopPropagation()}
            >
            </div>
        </div>
    )
}

export default InputModal;