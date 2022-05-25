import Board from "./Board";
import "../../css/Wordle.css";
import StatModal from "./StatModal";
import { gameOptions } from "../../../config.json";

export default function WordleGame() {
    return (
        <div>
            <StatModal />
            <Board rowC={gameOptions.TRIES} word="cools" />
        </div>
    );
}
