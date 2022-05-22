import Board from "./Board";
import "../../css/Wordle.css";

const TRIES = 5;

export default function WordleGame() {
    return (
        <Board rowC={TRIES} />
    );
}
