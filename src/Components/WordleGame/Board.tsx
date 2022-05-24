import { useEffect, useState } from "react";
import create from "zustand";
import { v4 as uuidv4 } from "uuid";
import alanBtn from "@alan-ai/alan-sdk-web";
import { alanKey } from "../../../config.json";
import { RowProps } from "./Row";
import Row from "./Row";
import { SquareStatus } from "./Square";

export const CHARS = "abcdefghijklmnopqrstuvwxyz";
export const WLENGTH = 5;
export interface IGameStats {
    word: string;
    isWin: boolean;
}
interface IGameStatsStore extends IGameStats {
// eslint-disable-next-line no-unused-vars
   setWord: (word: string) => void;
// eslint-disable-next-line no-unused-vars
   setIsWin: (isWinning: boolean) => void;
}

type idRowProps = RowProps & {id: string};
type BoardProps = {
    rowC: number;
}
export const useStore = create<IGameStatsStore>((set) => ({
    isWin: false,
    word: "",
    setWord: (word: string) => set(
        () => ({ word }),
    ),
    setIsWin: (isWin: boolean) => set(
        () => ({ isWin }),
    ),
}));

export default function Board({ rowC }: BoardProps) {
    const [rows, setRows] = useState<idRowProps[]>([]);
    const [currRow, setCurrRow] = useState<number>(0);
    const { setIsWin: setIsWinning, setWord } = useStore();

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
     * General game logic
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
        function handleGameNextAction() {
            function checkRow(index: number, word: string) {
                const row = rows[index];
                const result = Array.from(row.word).map((c, i) => {
                    if (c === word.charAt(i)) {
                        return SquareStatus.SquareCorrect;
                    } 
                    if (word.indexOf(c) >= 0) {
                        return SquareStatus.SquarePartial;
                    }
                    return SquareStatus.SquareWrong;
                });
                return result;
            }
            function isWinning() {
                if (rows[currRow].word === "cools") {
                    return true;
                }
                return false;
            }
            function gameWin() {
                setIsWinning(true);
                setWord("cools");
            }

            if (rows[currRow].word.length !== WLENGTH) {
                return;
            }

            setRows((e) => e.map((r, i) => {
                if (i !== currRow) return r;

                return { word: r.word, id: r.id, rowStatus: checkRow(currRow, "cools") };
            }));

            if (!isWinning()) {
                setCurrRow((r) => r + 1);
            } else {
                gameWin();
            }
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
    }, [rows, currRow, setIsWinning, setWord]);

    return (
        <div className="Board">
            {rows.map((e) => <Row word={e.word} key={e.id} rowStatus={e.rowStatus} />)}
        </div>
    );
}
