import Board from "./Board"
import "../../css/Wordle.css"

export default function WordleGame() {
    return(
        <div className="Board"><Board rowC={5} /></div>
    )
}