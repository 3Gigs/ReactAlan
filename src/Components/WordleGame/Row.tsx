import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Square, { SquareStatus } from "./Square";

export type RowProps = {
    word: string,
    rowStatus: Array<SquareStatus>,
    cols: number
}

/**
 * The Row component in a Wordle board
 * 
 * If word length is greater than cols, then it will throw an exception.
 * Make sure the word length is **not greater** than the column provided!
 * 
 * @throws If word.length > cols
 */
export default function Row({ word, rowStatus, cols }: RowProps) {
    if (word.length > cols) {
        throw new Error("The word provided is greater than column length!");
    }

    const genId = (amount: number, ids: Array<string>): Array<string> => {
        if (amount === 0) {
            return ids;
        }
        return genId(amount - 1, [...ids, uuidv4()]);
    };
    const [keys] = useState(genId(cols, []));

    function rows() {
        let result: JSX.Element[] = [];

        for (let i = 0; i < cols; i++) {
            result = [...result, 
                <Square char={word.charAt(i)} status={rowStatus[i]} key={keys[i]} />,
            ];
        }

        return result;
    }

    return (<div className="Row">{rows()}</div>);
}
