import React from 'react';
import chuckImg from '../../img/chuck.png';

interface Props {
    show: boolean,
    isAngry: boolean,
    isSpeaking: boolean,
    walkAway: boolean,
    click: any
}



const Chuck = (props: Props) => {

    const wrapperStyles = (() => {
        if (props.walkAway) {
            return { transform: "translateX(320px)" }
        }
        else return { transform: "translateX(0)" };
    })();

    const imgStyles = (() => {
        if (props.walkAway) {
            return { animation: "walkAway 1s infinite" }
        }
        if (props.isSpeaking) return { animation: "chuckSpeaking 1s infinite" };
    })();



    return (
        <div className={props.show ? "frame show" : "frame"} style={props.isAngry ? { backgroundColor: "red", transition: "background-color 5s" } : { backgroundColor: "white", transition: "background-color 5s" }}>
            <div className="chuckAnimWrapper" style={wrapperStyles}>
                <img style={imgStyles} className="chuck" onClick={props.click} src={chuckImg}></img>
            </div>
        </div >
    )
}

export default Chuck;