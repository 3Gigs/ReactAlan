import Square from "./Square"

export default function(props: {cols: number, word?: string}) {
    function rows(cols: number, word?: string) {
        let result: JSX.Element[] = [];

        for(let i = 0; i < cols; i++) {
            result = [...result, <Square char={(word ? word.charAt(i) : undefined) ?? "⠀"} status={1}/>];
        }

        return result;
    }

    return (<div className="Row">{rows(props.cols, props.word)}</div>);
}