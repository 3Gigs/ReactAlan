import { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { alanKey } from "../../config.json";
import WordleGame from "../Components/WordleGame/WordleGame";

export default function Wordle() {
    useEffect(() => {
        if (!(window as any).tutorProject) {
            alanBtn({
                key: alanKey,
                onCommand: ((commandData) => {
                    if ((commandData as any).command === "go:back") {
                        console.log("onCommand received!");
                    }
                }),
            });
        }
    });

    return (
        <main className="App">
            <h1>Wordle: Alan AI Edition</h1>
            <h3><i>A recreation of the smash hit game Wordle by NY Times</i></h3>
            <p>By Huaxuan Yang</p>
            <WordleGame />
        </main>
    );
}
