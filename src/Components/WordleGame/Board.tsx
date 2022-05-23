import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Row from "./Row";

const CHARS = "abcdefghijklmnopqrstuvwxyz";
const WLENGTH = 5;

type BoardProps = {
    rowC: number;
}

export default function Board({ rowC }: BoardProps) {
    const [rows, setRows] = useState<JSX.Element[]>([]);
    const [currRow, setCurrRow] = useState(0);
    const [currInput, setInput] = useState("");

    /**
     * Initialize board with rows
     */
    useEffect(() => {
        const result: JSX.Element[] = [];

        for (let i = 0; i < rowC; i++) {
            result.push(<Row cols={WLENGTH} key={uuidv4()} />);
        }
        setRows(result);
    }, [rowC]);
    /**
     * Handle keyboard and input
     */
    useEffect(() => {
        function setRow(index: number, word: string) {
            const newRows = rows.map((e: JSX.Element, i: number) => {
                if (i === index) {
                    return <Row cols={WLENGTH} word={word} key={uuidv4()} />;
                }
                return e;
            });
            setRows(newRows);
        }

        const appendCharToInput = (n: string) => setInput((e) => e + n);
        const handler = (e: KeyboardEvent) => {
            if (!e.repeat && CHARS.indexOf(e.key) >= 0) {
                appendCharToInput(e.key);
                setRow(currRow, currInput);
                console.log(currInput);
            }
        };
        document.addEventListener("keydown", handler);

        return function cleanup() {
            document.removeEventListener("keydown", handler);
        };
    }, [currInput, currRow, rows]);

    return <div className="Board">{rows}</div>;
}
