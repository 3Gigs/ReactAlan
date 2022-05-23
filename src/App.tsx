import "./css/App.css";
import { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { Link } from "react-router-dom";
import { alanKey } from "../config.json";

function App() {
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ((commandData) => {
                if ((commandData as any).command === "go:back") {
                    console.log("onCommand received!");
                }
            }),
        });
    });

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
