import { GameStatus, useStore } from "./Board";

export default function StatModal() {
    const { gameStatus, word } = useStore();

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
