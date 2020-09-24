import React, { useEffect, useState } from "react"
import { Link } from 'gatsby';
import chuckImg from '../img/chuck.png';
import BusyAnimation from "../components/BusyAnimation";
import whatsapp from '../img/app.png';
import linkedin from '../img/in.png';
import repo from '../img/repo.png';
import git from '../img/git.png';


let chuckInteger = 0;
let firstTime = true;
let hasCalmedDown = true;

export default function Home() {


    const [chuck, setChuck] = useState({
        show: false,
        text: "That's right, punch my face and I'll tell you jokes.",
        isAngry: false,
        walkAway: false
    })
    const [showModal, setShowModal] = useState(false);
    const [isBusy, setIsBusy] = useState(true);

    const ANGRY_LINES = ["I wouldn't interrupt if I were you.", "Damn you're annoying!.", "Wait the fuck up while I'm speaking!", "I'm coming over to beat you up!"]
    let x: number;

    let synthesis = window.speechSynthesis;
    const voices = synthesis.getVoices();
    let angryUtterance = new SpeechSynthesisUtterance;
    console.log(voices[0])
    angryUtterance.voice = voices[0];
    angryUtterance.text = ANGRY_LINES[chuckInteger]
    angryUtterance.volume = 10;
    angryUtterance.rate = 0.8;
    angryUtterance.pitch = 0;
    angryUtterance.addEventListener("end", () => {
        console.log("on angrrryyyyyyyyyyy end event!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        if (!chuck.walkAway) {
            setChuck(prev => ({ ...prev, isAngry: false }))
            hasCalmedDown = true;
        } if (chuck.walkAway) {

        }
    })
    let utterance = new SpeechSynthesisUtterance;
    utterance.voice = voices[0];
    utterance.text = chuck.text;
    utterance.volume = 10;
    utterance.rate = 0.8;
    utterance.pitch = 0;
    utterance.addEventListener("end", () => {
        console.log("on end event!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        getRandomJoke();
        if (firstTime) { firstTime = false };
    })



    //Event handlers

    const onChuckClickedEventHandler = async () => {
        if (!chuck.walkAway) {
            if (!synthesis.speaking) {
                await getRandomJoke();
                synthesis.speak(utterance);
            } else {
                if (!chuck.isAngry && !firstTime) {
                    console.log("set gtfo")
                    synthesis.cancel();
                    setChuck(prev => ({ ...prev, isAngry: true }));
                    hasCalmedDown = false
                } else if (chuck.isAngry) {
                    return;
                } else if (!firstTime) { synthesis.cancel(); }
            }
        } else {
        }
    }


    //functions

    const getRandomJoke = async () => {
        console.log("get random joke");
        await fetch("https://api.chucknorris.io/jokes/random")
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                setChuck(prev => ({ ...prev, text: myJson.value }));
                console.log(myJson);
            });


    }

    //contact functions

    const icons = {
        google: "mailto:anthonwellsjo@gmail.com",
        git: "https://github.com/anthonwellsjo/",
        linkedIn: "https://www.linkedin.com/in/anthonwellsjo",
        whatsApp: "https://api.whatsapp.com/send?phone=393396479127"
    }


    function openInNewTab(url: string) {
        var win = window.open(url, '_blank');
        if (win !== null) {
            win.focus();
        }
    }
    const onIconClicked = type => {
        openInNewTab(type);
    }


    //Life Cyclesoke();

    useEffect(() => {

        if (isBusy) {
            setTimeout(() => {
                console.log("Simulating work");
                setIsBusy(false);
            }, 500
            )
        } else {
            setChuck(prev => ({ ...prev, show: true }));
        }
    }, [isBusy])




    if (chuck.isAngry && !hasCalmedDown) {
        synthesis.speak(angryUtterance);
        if (chuckInteger < 3) { chuckInteger++ } else {
            setChuck(prev => ({ ...prev, walkAway: true }));
            setTimeout(() => {
                setShowModal(true);
            }, 2000);
        }
        hasCalmedDown = true;
    }


    return (
        <>

            <div className={showModal ? "pissedOfModal" : "pissedOfModal hideModal"}>
                <div className="modalHeader">
                    <div onClick={() => setShowModal(false)} className="closeBtn">
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
                        <p>You pissed off the Chuck! Thanks for visiting. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quo debitis ex odit blanditiis perferendis modi repellat ratione suscipit ea, est obcaecati iste. Dolorem illum pariatur nisi ipsam, obcaecati quibusdam.</p>
                    </div>
                </section>
            </div>

            <BusyAnimation in={isBusy} />
            <div className="pageContainer">
                <header>
                    <h1>It's Chuck!</h1>
                </header>
                <div className={chuck.show ? "frame show" : "frame"} style={chuck.isAngry ? { backgroundColor: "red", transition: "background-color 5s" } : { backgroundColor: "white", transition: "background-color 5s" }}>
                    <div className="chuckAnimWrapper" style={chuck.walkAway ? { transform: "translateX(320px)" } : { transform: "translateX(0)" }}>
                        <img style={chuck.walkAway ? { animation: "walkAway 1s infinite" } : { animation: "none" }} className="chuck" onClick={() => {
                            onChuckClickedEventHandler();
                        }} src={chuckImg}></img>
                    </div>
                </div >
            </div>
            <div className="contactBar">
                <img src={repo} className="iconImg" onClick={() => onIconClicked(icons.google)}></img>
                <img src={linkedin} className="iconImg" onClick={() => onIconClicked(icons.linkedIn)}></img>
                <img src={git} className="iconImg" onClick={() => onIconClicked(icons.git)}></img>
                <img src={whatsapp} className="iconImg" onClick={() => onIconClicked(icons.whatsApp)}></img>
            </div>
            <div className={showModal ? "showBackDrop" : "hideBackDrop"} style={{ backdropFilter: "blur(4px)", position: "absolute", top: "0", left: "0", bottom: "0", right: "0", transition: "transform .5s", boxShadow: "4px 6px 15px black" }}></div>
        </>
    )
}
