import { useEffect, useState } from "react";
import Row from "./Row";

const CHARS = "abcdefghijklmnopqrstuvwxyz";
const TRIES = 5;
const WLENGTH = 5;

type BoardProps = {
    rowC: number;
}

export default function Board({ rowC }: BoardProps) {
    const [rows, setRows] = useState<JSX.Element[]>([]);
    const [currInput, setInput] = useState("");

    function setBoard(rowC: Readonly<number>) {
        let result: JSX.Element[] = [];

        for (let i = 0; i < rowC; i++) {
            result = [...result, <Row cols={WLENGTH} />];
        }

        setRows(result);
    }

    function setRow(index: number, word: string) {
        const result = rows;

        result[index] = <Row cols={WLENGTH} word="test" />;

        setRows(result);
    }

    useEffect(() => {
        setBoard(TRIES);
        console.log(rows);
    }, []);

    useEffect(() => {
        const currRow = 0;
        let isHoldingKey = false;

        document.addEventListener("keydown", (event) => {
            if (CHARS.indexOf(event.key) >= 0 && !isHoldingKey) {
                isHoldingKey = true;
                setInput((c) => c + event.key);
                console.log(currInput);
                setRow(0, currInput);
            }
        });

        document.addEventListener("keyup", (e) => {
            isHoldingKey = false;
        });
    }, []);

    return <div className="Board">{rows}</div>;
}
