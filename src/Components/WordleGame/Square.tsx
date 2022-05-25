import "../../css/Wordle.css";

/* eslint-disable no-unused-vars */
export enum SquareStatus {
    "SquareWrong" = -1,
    "SquareNeutral" = 0,
    "SquarePartial" = 1,
    "SquareCorrect" = 2,
}

type SquareProps = {
    char: string;
    status: SquareStatus
}

export default function Square({ char, status }: SquareProps) {
    return (
        <div className={`Square ${SquareStatus[status]}`}>{char}</div>
    );
}
