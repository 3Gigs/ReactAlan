import "./css/App.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { alanKey } from "../config.json";

function App() {
    useEffect(() => {
        document.title = "Alan AI Apps";
    });

    useEffect(() => {
        if (!(window as any).alanBtnInstance) {
            (window as any).alanBtnInstance = alanBtn({
                key: alanKey,
                onCommand: ((commandData: any) => {
                    console.log(`SLDFJLDSFJLSDJFLSDJDLSDFJ ${commandData}`);
                    switch (commandData.command) {
                    case "setRowWord":
                        document.dispatchEvent(new CustomEvent("setRowWord", {
                            detail: {
                                word: commandData.word as string,
                            },
                        }));
                        break;
                    case "nextGameAction":
                        document.dispatchEvent(new Event("nextGameAction"));
                        break;
                    default:
                        break;
                    }
                }),
            });
        }
    }, []);

    return (
        <div className="App">
            <h1>Alan AI Apps</h1>
            <h3>By Huaxuan Yang</h3>
            <p>Here are some apps I've integrated with Alan AI</p>
            <h4>Navigate with Alan AI by clicking on the blue bottom in bottom right!</h4>
            <nav>
                <Link to="/Wordle">Wordle</Link>
            </nav>
        </div>
    );
}

export default App;
