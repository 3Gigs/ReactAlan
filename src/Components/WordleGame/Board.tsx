import { useEffect, useState } from "react";
import Row from "./Row";

const CHARS = "abcdefghijklmnopqrstuvwxyz";
const WLENGTH = 5;

type BoardProps = {
    rowC: number;
}

export default function Board({ rowC }: BoardProps) {
    const [rows, setRows] = useState<JSX.Element[]>([]);
    const [currInput, setInput] = useState("");

    /**
     * Initialize board with rows
     */
    useEffect(() => {
        let result: JSX.Element[] = [];

        for (let i = 0; i < rowC; i++) {
            result = [...result, <Row cols={WLENGTH} />];
        }
        setRows(result);
    }, [rowC]);

    /**
     * Handle keyboard and input
     */
    useEffect(() => {
        const appendCharToInput = (n: string) => setInput((e) => e + n);
        const handler = (e: KeyboardEvent) => {
            if (!e.repeat && CHARS.indexOf(e.key) >= 0) {
                appendCharToInput(e.key);
                console.log(currInput);
            }
        };
        document.addEventListener("keydown", handler);

        return function cleanup() {
            document.removeEventListener("keydown", handler);
        };
    }, [currInput]);

    return <div className="Board">{rows}</div>;
}
