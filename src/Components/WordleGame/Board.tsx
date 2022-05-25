import { useEffect, useState } from "react";
import create from "zustand";
import { v4 as uuidv4 } from "uuid";
import { RowProps } from "./Row";
import Row from "./Row";
import { SquareStatus } from "./Square";
import { gameOptions, alanKey } from "../../../config.json";
import alanBtn from "@alan-ai/alan-sdk-web";

export const CHARS = "abcdefghijklmnopqrstuvwxyz";
export enum GameStatus {
    "NEUTRAL",
    "WIN",
    "LOSE",
}
export interface IGameStats {
    word: string;
    gameStatus: GameStatus;
}

interface IGameStatsStore extends IGameStats {
// eslint-disable-next-line no-unused-vars
   setWord: (word: string) => void;
// eslint-disable-next-line no-unused-vars
   setGameStatus: (gameStat: GameStatus) => void;
}

type idRowProps = RowProps & {id: string};
type BoardProps = {
    rowC: number;
    word: string;
}
export const useStore = create<IGameStatsStore>((set) => ({
    gameStatus: GameStatus.NEUTRAL,
    word: "",
    setWord: (word: string) => set(
        () => ({ word }),
    ),
    setGameStatus: (gameStatus: GameStatus) => set(
        () => ({ gameStatus }),
    ),
}));

export default function Board({ rowC, word }: BoardProps) {
    const [rowProps, setRowProps] = useState<idRowProps[]>([]);
    const [currRow, setCurrRow] = useState<number>(0);
    const { setGameStatus, setWord, gameStatus } = useStore();

    /**
     * Initialize board
     */
    useEffect(() => {
        setWord(word);
        const result: idRowProps[] = [];
        const initRowStatus = (cols: number, arr: Array<SquareStatus>): Array<SquareStatus> => {
            if(cols === 0) {
                return arr;
            }
            return initRowStatus(cols - 1, [...arr, SquareStatus.SquareNeutral])
        }

        for (let i = 0; i < rowC; i++) {
            result.push({ word: "", id: uuidv4(), rowStatus: initRowStatus(gameOptions.WLENGTH, []), cols: gameOptions.WLENGTH });
        }

        setRowProps(result);
    }, [rowC]);
    useEffect(() => {
        if (!(window as any).tutorProject) {
            alanBtn({
                key: alanKey,
                onCommand: ((commandData) => {
                    if ((commandData as any).command === "go:back") {
                        console.log("onCommand received!");
                    }
                }),
            });
        }
    });

    /**
     * General game logic
     */
    useEffect(() => {
        function appendCharToRow(row: number, char: string) {
            const result = rowProps.map((e, i): idRowProps => {
                if (i === row && (e.word.length + 1) <= gameOptions.WLENGTH) {
                    return { rowStatus: e.rowStatus, id: e.id, word: e.word + char, cols: gameOptions.WLENGTH };
                }
                return e;
            });
            setRowProps(result);
        }
        function backspaceCharToRow(row: number) {
            const result = rowProps.map((e, i): idRowProps => {
                if (i === row) {
                    return { 
                        rowStatus: e.rowStatus, 
                        id: e.id, 
                        word: e.word.slice(0, e.word.length - 1),
                        cols: gameOptions.WLENGTH,
                    };
                }
                return e;
            });
            setRowProps(result);
        }
        function handleGameNextAction() {
            function checkRow(index: number, word: string) {
                const row = rowProps[index];
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
            const isWinning = () => rowProps[currRow].word === "cools";
            const isLosing = () => currRow >= gameOptions.TRIES - 1;

            setRowProps((e) => e.map((r, i) => {
                if (i !== currRow) return r;

                return { word: r.word, id: r.id, cols: gameOptions.WLENGTH, rowStatus: checkRow(currRow, "cools") };
            }));

            if(isWinning()) {
                setGameStatus(GameStatus.WIN);
            } else if (isLosing()) {
                setGameStatus(GameStatus.LOSE);
            } else {
                setCurrRow((r) => r + 1);
            }
        }
        const handler = (e: KeyboardEvent) => {
            if (!e.repeat && gameStatus === GameStatus.NEUTRAL) {
                if (CHARS.indexOf(e.key) >= 0) {
                    appendCharToRow(currRow, e.key);
                } else if (e.key === "Backspace") {
                    backspaceCharToRow(currRow);
                } else if (e.key === "Enter") {
                    if (rowProps[currRow].word.length !== gameOptions.WLENGTH) {
                        return;
                    }
                    handleGameNextAction();
                }
            }
        };
        document.addEventListener("keydown", handler);

        return function cleanup() {
            document.removeEventListener("keydown", handler);
        };
    }, [rowProps, currRow, setGameStatus, setWord]);

    return (
        <div className="Board">
            {rowProps.map((e) => <Row word={e.word} key={e.id} rowStatus={e.rowStatus} cols={gameOptions.WLENGTH} />)}
        </div>
    );
}
