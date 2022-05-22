import Square from "./Square"
import {useState} from "react"

export default function(props: {cols: number}) {
    const [squares, setSquares] = useState(new Array(props.cols));

    

    return <h1>Test</h1>;
}