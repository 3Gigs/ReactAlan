import { useStore } from "./Board";

export default function StatModal() {
    const { isWin, word } = useStore();

    return (
        <div id="Modal">
            <div id="ModalContent">
                <h1>
                    You
                    {isWin ? " won!" : " lose..."}
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
