import React from 'react';
import whatsapp from '../../img/app.png';
import linkedin from '../../img/in.png';
import repo from '../../img/repo.png';
import git from '../../img/git.png';

interface Props {
    googleClicked: any,
    linkedInClicked: any,
    gitClicked: any,
    whatsappClicked: any,
    show: boolean,
}

const ContactBar = (props: Props) => {
    return (
        <div className="contactBar" style={props.show ? { opacity: "1" } : { opacity: "0" }}>
            <img src={repo} className="iconImg" onClick={props.googleClicked}></img>
            <img src={linkedin} className="iconImg" onClick={props.linkedInClicked}></img>
            <img src={git} className="iconImg" onClick={props.gitClicked}></img>
            <img src={whatsapp} className="iconImg" onClick={props.whatsappClicked}></img>
        </div>
    )
}

export default ContactBar;