import { v4 as uuidv4 } from "uuid";
import Square from "./Square";

type RowProps = {
    cols: number,
    word: string
}

function getCharFromWord(word: string, index: number) {
    const result = word.charAt(index);
    if (result.length <= 0) {
        return undefined;
    }
    return result;
}

export default function Row({ cols, word }: RowProps) {
    function rows() {
        let result: JSX.Element[] = [];

        for (let i = 0; i < cols; i++) {
            result = [...result, <Square char={word.charAt(i)} status={1} key={uuidv4()} />];
        }

        return result;
    }

    return (<div className="Row">{rows()}</div>);
}
