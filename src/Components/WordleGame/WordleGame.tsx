import { useEffect } from "react";
import { gameOptions } from "../../../config.json";
import Board from "./Board";
import "../../css/Wordle.css";
import StatModal from "./StatModal";
import initAlanBtn from "../../utils/initAlanBtn";

export default function WordleGame() {
    useEffect(() => {
        initAlanBtn();
    }, []);

    return (
        <div>
            <StatModal />
            <Board rowC={gameOptions.TRIES} word="cools" />
        </div>
    );
}
