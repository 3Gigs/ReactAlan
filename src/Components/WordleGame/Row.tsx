import { v4 as uuidv4 } from "uuid";
import Square, { SquareStatus } from "./Square";

export type RowProps = {
    word: string,
    rowStatus: Array<SquareStatus>,
    cols: number
}

/**
 * The Row component in a Wordle board
 * 
 * If word length is greater than cols, then the rest of the characters will 
 * be trimmed while creating the wordle squares, but the word variable will 
 * remain intact. 
 * 
 * In other words, make sure the word length is **not greater** than the column provided!
 * 
 */
export default function Row({ word, rowStatus, cols }: RowProps) {
    function rows() {
        let result: JSX.Element[] = [];

        for (let i = 0; i < cols; i++) {
            result = [...result, 
                <Square char={word.charAt(i)} status={rowStatus[i]} key={uuidv4()} />,
            ];
        }

        return result;
    }

    return (<div className="Row">{rows()}</div>);
}
