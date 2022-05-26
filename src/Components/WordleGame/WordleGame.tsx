import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect } from "react";
import { alanKey, gameOptions } from "../../../config.json";
import Board from "./Board";
import "../../css/Wordle.css";
import StatModal from "./StatModal";

export default function WordleGame() {
    useEffect(() => {
        if (!(window as any).alanBtnInstance) {
            (window as any).alanBtnInstance = alanBtn({
                key: alanKey,
                onCommand: ((commandData: any) => {
                    console.log(`SLDFJLDSFJLSDJFLSDJDLSDFJ ${commandData}`);
                    switch (commandData.command) {
                    case "setRowWord":
                        document.dispatchEvent(new CustomEvent("setRowWord", {
                            detail: {
                                word: commandData.word as string,
                            },
                        }));
                        break;
                    case "nextGameAction":
                        document.dispatchEvent(new Event("nextGameAction"));
                        break;
                    default:
                        break;
                    }
                }),
            });
        }
    }, []);

    return (
        <div>
            <StatModal />
            <Board rowC={gameOptions.TRIES} word="cools" />
        </div>
    );
}
