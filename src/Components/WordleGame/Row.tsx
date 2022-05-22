import Square from "./Square"

export default function(props: {cols: number}) {
    let squares: JSX.Element[] = [];

    for(let i = 0; i < props.cols; i++) {
        squares = [...squares, <Square char={"d"} status={1}/>]
    }

    return (<div className="Row">{squares}</div>);
}