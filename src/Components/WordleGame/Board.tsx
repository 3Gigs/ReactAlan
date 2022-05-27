import { useCallback, useEffect, useState } from "react";
import create from "zustand";
import { v4 as uuidv4 } from "uuid";
import { RowProps } from "./Row";
import Row from "./Row";
import { SquareStatus } from "./Square";
import { gameOptions } from "../../../config.json";

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

    const handleGameNextAction = useCallback(() => {

        function checkRow(index: number, word: string) {
            const row = rowProps[index];
            console.log(index);
            console.log(rowProps);
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
        const isWinning = () => rowProps[currRow].word === word;
        const isLosing = () => currRow >= gameOptions.TRIES - 1;

        setRowProps((e) => e.map((r, i) => {
            if (i !== currRow) return r;

            return { word: r.word, id: r.id, cols: gameOptions.WLENGTH, rowStatus: checkRow(currRow,word) };
        }));

        if(isWinning()) {
            setGameStatus(GameStatus.WIN);
        } else if (isLosing()) {
            setGameStatus(GameStatus.LOSE);
        } else {
            setCurrRow((r) => r + 1);
        }

    }, [currRow, rowProps]);
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
    }, []);
    /**
     * Game Logic (Alan AI)
     */
    useEffect((): any => {
        const eventHandlerRowWord = (e: any) => setRowProps((p) => p.map((r, i) => {
            if(i === currRow) {
                return {...r, word: e.detail.word.slice(0, gameOptions.WLENGTH)}
            }
            return r;
        }));
        const eventHandlerNGAction = () => {
            handleGameNextAction();
        }

        document.addEventListener("setRowWord", eventHandlerRowWord);
        document.addEventListener("nextGameAction", eventHandlerNGAction);
        return () => {
            document.removeEventListener("setRowWord", eventHandlerRowWord)
            document.removeEventListener("nextGameAction", eventHandlerNGAction);
        };
    }, [currRow, rowProps]);
    /**
     * Phone back to Alan AI on game status
     */
    useEffect(() => {
        if(!(window as any).alanBtnInstance) return;

        (window as any).alanBtnInstance.callProjectApi("guessResult", {isWin: GameStatus[gameStatus], word}, (err: any) => {
            if(err) {
                console.error(err)
            }
        });
    }, [gameStatus]);
    /**
     * Game logic (Keyboard)
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
    }, [rowProps, currRow, setWord]);

    return (
        <div className="Board">
            {rowProps.map((e) => <Row word={e.word} key={e.id} rowStatus={e.rowStatus} cols={gameOptions.WLENGTH} />)}
        </div>
    );
}
