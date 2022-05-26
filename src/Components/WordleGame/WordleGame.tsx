import alanBtn from "@alan-ai/alan-sdk-web";
import { alanKey } from "../../../config.json";
import Board from "./Board";
import "../../css/Wordle.css";
import StatModal from "./StatModal";
import { gameOptions } from "../../../config.json";

export default function WordleGame() {
    (window as any).alanBtnInstance = alanBtn({
        key: alanKey,
        onCommand: ((commandData: any) => {
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

    return (
        <div>
            <StatModal />
            <Board rowC={gameOptions.TRIES} word="cools" />
        </div>
    );
}
