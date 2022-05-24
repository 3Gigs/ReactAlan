import Board from "./Board";
import "../../css/Wordle.css";
import StatModal from "./StatModal";

const TRIES = 5;

export default function WordleGame() {
    return (
        <div>
            <StatModal />
            <Board rowC={TRIES} />
        </div>
    );
}
