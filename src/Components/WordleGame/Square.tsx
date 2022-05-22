import "../../css/Wordle.css";

export default function Square(props: {char: string, status: number}) {
    const { char } = props;

    return (
        <div className="Square">{char}</div>
    );
}
