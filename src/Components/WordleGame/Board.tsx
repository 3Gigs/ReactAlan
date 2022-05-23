import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Row from "./Row";

export const CHARS = "abcdefghijklmnopqrstuvwxyz";
export const WLENGTH = 5;

type BoardProps = {
    rowC: number;
}

type RowProps = {
    id: string;
    word: string;
}

export default function Board({ rowC }: BoardProps) {
    const [rows, setRows] = useState<RowProps[]>([]);
    const [currRow, setCurrRow] = useState<number>(0);

    /**
     * Initialize board with rows
     */
    useEffect(() => {
        const result: RowProps[] = [];

        for (let i = 0; i < rowC; i++) {
            result.push({ id: uuidv4(), word: "" });
        }

        setRows(result);
    }, [rowC]);
    /**
     * Handle keyboard and input
     */
    useEffect(() => {
        function appendCharToRow(row: number, char: string) {
            const result = rows.map((e, i) => {
                if (i === row && (e.word.length + 1) <= WLENGTH) {
                    return { id: e.id, word: e.word + char };
                }
                return e;
            });
            setRows(result);
        }
        function backspaceCharToRow(row: number) {
            const result = rows.map((e, i) => {
                if (i === row) {
                    return { id: e.id, word: e.word.slice(0, e.word.length - 1) };
                }
                return e;
            });
            setRows(result);
        }
        const handler = (e: KeyboardEvent) => {
            if (!e.repeat) {
                if (CHARS.indexOf(e.key) >= 0) {
                    appendCharToRow(currRow, e.key);
                } else if (e.key === "Backspace") {
                    backspaceCharToRow(currRow);
                }
            }
        };
        document.addEventListener("keydown", handler);

        return function cleanup() {
            document.removeEventListener("keydown", handler);
        };
    }, [rows, currRow]);

    return (
        <div className="Board">
            {rows.map((e) => <Row cols={WLENGTH} word={e.word} key={e.id} />)}
        </div>
    );
}
