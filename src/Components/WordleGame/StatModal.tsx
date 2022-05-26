import { useEffect } from "react";
import { GameStatus, useStore } from "./Board";

export default function StatModal() {
    const { gameStatus, word } = useStore();

    useEffect(() => {
        const modal = document.getElementById("Modal");
        const modalContent = document.getElementById("ModalContent");
        if (modal && modalContent) {
            switch (gameStatus) {
            case GameStatus.NEUTRAL:
                modal.style.display = "none";
                break;
            case GameStatus.LOSE:
                modalContent.style.boxShadow = "0 8px 8px -4px lightcoral";
                modal.style.display = "block";
                break;
            case GameStatus.WIN:
                console.log(modalContent.style.boxShadow);
                modalContent.style.boxShadow = "0 8px 8px -4px lightgreen";
                modal.style.display = "block";
                break;
            default:    
            }
        }
    });

    return (
        <div id="Modal">
            <div id="ModalContent">
                <h1>
                    You
                    {(() => {
                        switch (gameStatus) {
                        case GameStatus.WIN:
                            return " win!";
                        case GameStatus.LOSE:
                            return " lose...";
                        default:
                            return "";
                        }
                    })()}
                </h1>
                <span>
                    Word of the day: 
                    <br />
                    <i><b>{` ${word}`}</b></i>
                </span>
            </div>
        </div>
    );
}
