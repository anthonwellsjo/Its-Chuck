import React, { useState } from 'react';

interface Props {
    show: boolean,
    children?: Array<string>
}



const ChuckConsole = (props: Props) => {

    const [showConsole, setShowConsole] = useState(false);




    return (
        <div className="chuckConsoleHolder">
            <button className={(!showConsole && props.show)? "consoleBtn" : "consoleBtn hideConsole"} onClick={() => setShowConsole(!showConsole)}>Open the Chucksole</button>
            <div className={showConsole ? "chuckConsoleContainer" : "chuckConsoleContainer hideConsole"}>
                <div className="chuckConsole">
                    <div onClick={()=> setShowConsole(!showConsole)} className="consoleCloseBtn">X</div>
                    <div className="chuckConsoleContainerInner">
                        {props.children.slice(0).reverse().map((log, index) => {
                            return <h5 key={index + log} style={(log.includes("fetching")) ? { color: "red" } : { color: "white" }}>{log}</h5>
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChuckConsole;