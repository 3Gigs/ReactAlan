import { useEffect } from "react";
import WordleGame from "../Components/WordleGame/WordleGame";
import "../css/Wordle.css";

export default function Wordle() {
    useEffect(() => {
        document.title = "Wordle: Alan AI Edition";
    });

    return (
        <main className="WordleGame">
            <h1>Wordle: Alan AI Edition</h1>
            <h3><i>A recreation of the smash hit game Wordle by NY Times</i></h3>
            <p>By Huaxuan Yang</p>
            <WordleGame />
        </main>
    );
}
