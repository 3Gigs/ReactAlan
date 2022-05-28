import { useEffect, useState } from "react";
import { gameOptions, dictionaryAPI } from "../../../config.json";
import Board from "./Board";
import "../../css/Wordle.css";
import StatModal from "./StatModal";
import initAlanBtn from "../../utils/initAlanBtn";

export default function WordleGame() {
    const [word, setWord] = useState("");

    useEffect(() => {
        initAlanBtn();
        (window as any).alanBtnInstance.activate();
        (window as any).alanBtnInstance.callProjectApi("greetUser", {});
    }, []);

    useEffect(() => {
        const fetchWord = async () => fetch(dictionaryAPI);
        fetchWord().then((r) => r.text().then((w) => setWord(w)));
    }, []);

    return (
        <div>
            <StatModal />
            <Board rowC={gameOptions.TRIES} word={word} />
        </div>
    );
}
