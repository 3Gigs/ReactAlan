import "../../css/Wordle.css"

export default function Square(props: {char: string, status: number}) {
    return(
        <div className="Square">{props.char}</div>
    )
}