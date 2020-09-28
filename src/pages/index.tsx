import React, { useEffect, useRef, useState } from "react"
import { Link } from 'gatsby';

import BusyAnimation from "../components/BusyAnimation";
import whatsapp from '../img/app.png';
import linkedin from '../img/in.png';
import repo from '../img/repo.png';
import git from '../img/git.png';
import Modal from "../components/modal/modal";
import Chuck from "../components/chuck/chuck";
import ChuckConsole from "../components/chuckConsole/chuckConsole";
import ContactBar from "../components/contactBar/contactBar";

let consoleArray: Array<string> = ["1: Initializing App", "2: Showing Loader", "3: Showing Chuck", "4: Ready for User Interaction"];
let speechSynthesis: SpeechSynthesis;
let angryUtterance: SpeechSynthesisUtterance;
let utterance: SpeechSynthesisUtterance;
let chuckInteger = 0;
let firstTime = true;
let hasCalmedDown = true;
let consoleCount: number = 5;
const ANGRY_LINES = ["I wouldn't interrupt if I were you.", "Damn you're annoying!.", "Wait the fuck up while I'm speaking!", "I'm coming over to beat you up!"]

export default function Home() {


    const [showModal, setShowModal] = useState(false);
    const [isBusy, setIsBusy] = useState(true);
    const [consoleData, setConsoleData] = useState(["1: Initializing App", "2: Showing Loader", "3: Showing Chuck", "4: Ready for User Interaction"]);
    const [chuck, setChuck] = useState({
        show: false,
        text: "That's right, punch my face and I'll tell you jokes.",
        isAngry: false,
        walkAway: false,
        isSpeaking: false
    })


    let forgetFocus = useRef();


    //Event handlers

    const onChuckClickedEventHandler = async () => {
        if (firstTime) {
            if (!speechSynthesis.speaking) {
                utterance.text = "That's right, punch my face and I'll tell you jokes.";
                speechSynthesis.speak(utterance);
                updateChuckConsole("That's right, punch my face and I'll tell you jokes.")
            } else {
                return;
            }
        }
        if (!chuck.walkAway) {
            if (!speechSynthesis.speaking) {
                await getRandomJoke();
                speechSynthesis.speak(utterance);
            } else if (speechSynthesis.speaking) {
                if (!chuck.isAngry && !firstTime) {
                    speechSynthesis.cancel();
                    updateChuckConsole("speechSynthesis.cancel()");
                    setChuck(prev => ({ ...prev, isAngry: true }));
                    updateChuckConsole(`chuck.angryLevel = ${100 / 4 * (chuckInteger + 1)}%`);
                    hasCalmedDown = false
                } else if (chuck.isAngry) {
                    updateChuckConsole("Can't click while Chuck is angry.")
                    return;
                } else if (!firstTime) { speechSynthesis.cancel(); }
            }
        } else {
        }
    }


    //functions

    const updateChuckConsole = (line: string) => {
        console.log("update chuck");

        for (let i = 0; i < consoleData.length - 1; i++) {
            console.log(i, "replacing", consoleArray[i], "with", consoleArray[i + 1])
            consoleArray[i] = consoleArray[i + 1];
        }
        consoleArray.push(consoleCount.toString() + ": " + line);
        consoleCount++;
        console.log("consoleArray", consoleArray);
        setConsoleData(consoleArray);

    }

    const getRandomJoke = async () => {
        console.log("get random joke");
        updateChuckConsole("fetching from API: https://api.chucknorris.io/jokes/random...");
        await fetch("https://api.chucknorris.io/jokes/random")
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                setChuck(prev => ({ ...prev, text: myJson.value }));
                utterance.text = myJson.value;
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
        speechSynthesis = window.speechSynthesis;
        const voices = speechSynthesis.getVoices();
        angryUtterance = new SpeechSynthesisUtterance;
        console.log(voices[0])
        angryUtterance.voice = voices[0];
        angryUtterance.text = ANGRY_LINES[chuckInteger]
        angryUtterance.volume = 10;
        angryUtterance.rate = 0.8;
        angryUtterance.pitch = 0;
        angryUtterance.addEventListener("end", () => {
            updateChuckConsole("chuck.isSpeaking = false");
            console.log("on angrrryyyyyyyyyyy end event!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            if (!chuck.walkAway) {
                setChuck(prev => ({ ...prev, isAngry: false }))
                updateChuckConsole("chuck.isAngry = false");
                hasCalmedDown = true;
            } if (chuck.walkAway) {

            }
        })
        utterance = new SpeechSynthesisUtterance;
        utterance.voice = voices[0];
        utterance.text = chuck.text;
        utterance.volume = 10;
        utterance.rate = 0.8;
        utterance.pitch = 0;
        utterance.addEventListener("start", () => {
            updateChuckConsole("chuck.isSpeaking = true");
            updateChuckConsole(utterance.text);
            setChuck(prev => ({ ...prev, isSpeaking: true }));

        })
        utterance.addEventListener("end", () => {
            updateChuckConsole("chuck.isSpeaking = false");
            console.log("on end event!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            if (firstTime) { firstTime = false };
            setChuck(prev => ({ ...prev, isSpeaking: false }));

        })

    }, [])

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
        angryUtterance.text = ANGRY_LINES[chuckInteger];
        speechSynthesis.speak(angryUtterance);
        if (chuckInteger < 3) { chuckInteger++ } else {
            setChuck(prev => ({ ...prev, walkAway: true }));
            updateChuckConsole("chuck.walkAway = true");
            setTimeout(() => {
                setShowModal(true);
            }, 2000);
        }
        updateChuckConsole("chuckHasCalmedDown = true");
        hasCalmedDown = true;
    }


    return (
        <>
            <Modal showModal={showModal} click={() => setShowModal(false)} header="Cheers!" element={<ContactBar show={chuck.show}
                googleClicked={() => onIconClicked(icons.google)}
                linkedInClicked={() => onIconClicked(icons.linkedIn)}
                gitClicked={() => onIconClicked(icons.git)}
                whatsappClicked={() => onIconClicked(icons.whatsApp)} />}>
                You pissed off the Chuck! Thanks for visiting. My name is Anthon and this App was built around the <a href="http://www.icndb.com/api/">Internet Chuck Norris Database Api</a>
            </Modal>

            <BusyAnimation in={isBusy} />
            <div className="pageContainer">
                <header style={chuck.show ? { opacity: "1" } : { opacity: "0" }}>
                    <h1>It's Chuck!</h1>
                </header>
                <Chuck show={chuck.show} isAngry={chuck.isAngry} isSpeaking={chuck.isSpeaking} walkAway={chuck.walkAway} click={() => onChuckClickedEventHandler()} />
            </div>
            <ChuckConsole show={chuck.show}>{consoleData}</ChuckConsole>
            <ContactBar
                show={chuck.show}
                googleClicked={() => onIconClicked(icons.google)}
                linkedInClicked={() => onIconClicked(icons.linkedIn)}
                gitClicked={() => onIconClicked(icons.git)}
                whatsappClicked={() => onIconClicked(icons.whatsApp)}
            />
            <div className={showModal ? "showBackDrop backDrop" : "hideBackDrop backDrop"}></div>
        </>
    )
}
