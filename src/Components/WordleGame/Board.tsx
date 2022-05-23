import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import alanBtn from "@alan-ai/alan-sdk-web";
import { alanKey } from "../../../config.json";
import { RowProps } from "./Row";
import Row from "./Row";

export const CHARS = "abcdefghijklmnopqrstuvwxyz";
export const WLENGTH = 5;

type BoardProps = {
    rowC: number;
}

type idRowProps = RowProps & {id: string};

export default function Board({ rowC }: BoardProps) {
    const [rows, setRows] = useState<idRowProps[]>([]);
    const [currRow, setCurrRow] = useState<number>(0);

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: (commandData) => {
            },
        });
    }, []);
    /**
     * Initialize board with rows
     */
    useEffect(() => {
        const result: idRowProps[] = [];

        for (let i = 0; i < rowC; i++) {
            result.push({ word: "", id: uuidv4(), rowStatus: [0, 0, 0, 0, 0] });
        }

        setRows(result);
    }, [rowC]);
    /**
     * Handle keyboard and input
     */
    useEffect(() => {
        function appendCharToRow(row: number, char: string) {
            const result = rows.map((e, i): idRowProps => {
                if (i === row && (e.word.length + 1) <= WLENGTH) {
                    return { rowStatus: e.rowStatus, id: e.id, word: e.word + char };
                }
                return e;
            });
            setRows(result);
        }
        function backspaceCharToRow(row: number) {
            const result = rows.map((e, i): idRowProps => {
                if (i === row) {
                    return { 
                        rowStatus: e.rowStatus, 
                        id: e.id, 
                        word: e.word.slice(0, e.word.length - 1),
                    };
                }
                return e;
            });
            setRows(result);
        }
        function checkRow() {

        }
        function handleGameNextAction() {
            checkRow();
            setCurrRow((r) => r + 1);
        }
        const handler = (e: KeyboardEvent) => {
            if (!e.repeat) {
                if (CHARS.indexOf(e.key) >= 0) {
                    appendCharToRow(currRow, e.key);
                } else if (e.key === "Backspace") {
                    backspaceCharToRow(currRow);
                } else if (e.key === "Enter") {
                    handleGameNextAction();
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
            {rows.map((e) => <Row word={e.word} key={e.id} rowStatus={e.rowStatus} />)}
        </div>
    );
}
