import { useEffect } from "react"
import Row from "./Row"

const CHARS = "abcdefghijklmnopqrstuvwxyz";
const TRIES = 5;
const WLENGTH = 5;

export default function Board(props: {rowC: Readonly<number>}) {
    useEffect(() => {
        let counter = 0;
        document.addEventListener("keydown", event => {
            if(CHARS.indexOf(event.key) > 0) {
            }
        })
    })

    function setRows(rowC: Readonly<number>) {
        let rowArr: Array<JSX.Element> = []

        for(let i = 0; i < rowC; i++)  {
            rowArr = [...rowArr, <Row cols={WLENGTH} />]
        }

        return rowArr;
    }

    return (<div className="Board">{setRows(TRIES)}</div>);
}