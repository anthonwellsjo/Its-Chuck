import React, { SetStateAction } from 'react';
import chuckImg from '../../img/chuck.png';

interface Props {
    showModal: boolean,
    click: any,
    header: string,
    children: string,
    element?: JSX.Element
}



const Modal = (props: Props) => {

    return (
        <div className={props.showModal ? "pissedOfModal" : "pissedOfModal hideModal"}>
            <div className="modalHeader">
                <div onClick={props.click} className="closeBtn">
                    X
                    </div>
            </div>
            <section className="modalSection">
                <div className="modalContentHeader">
                    <div className="modalPicCrop">
                        <img className="chuckModalPic" src={chuckImg} alt="chuck" ></img>
                    </div>
                    <h2>Cheers!</h2>
                </div>
                <div className="modalContentContainer">
                    <p>{props.children}</p>
                    {props.element}
                </div>
            </section>
        </div>
    )
}

export default Modal;