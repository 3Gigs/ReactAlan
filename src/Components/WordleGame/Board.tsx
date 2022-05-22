import { useEffect, useState } from "react"
import Row from "./Row"

const CHARS = "abcdefghijklmnopqrstuvwxyz";
const TRIES = 5;
const WLENGTH = 5;

export default function Board(props: {rowC: Readonly<number>}) {
    const [rows, setRows] = useState<JSX.Element[]>([]);

    function setBoard(rowC: Readonly<number>) {
        let result: JSX.Element[] = []

        for(let i = 0; i < rowC; i++)  {
            result = [...result, <Row cols={WLENGTH} />];
        }
        
        setRows(result);
    }

    useEffect(() => {
        setBoard(TRIES);
    }, []);

    useEffect(() => {
        let currRow = 0;
        document.addEventListener("keydown", event => {
            if(CHARS.indexOf(event.key) > 0) {
            }
        })
    })


    return (<div className="Board">{rows}</div>);
}