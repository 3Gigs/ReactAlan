import alanBtn from "@alan-ai/alan-sdk-web";
import { alanKey } from "../../config.json";

const initAlanBtn = () => {
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
                case "restartGame":
                    window.location.reload();
                    break;
                default:
                    break;
                }
            }),
        });
    }
};
export default initAlanBtn;
