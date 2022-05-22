import Square from "./Square";

type RowProps = {
    cols: number,
    word?: string
}

export default function Row({ cols, word }: RowProps) {
    function rows() {
        let result: JSX.Element[] = [];

        for (let i = 0; i < cols; i++) {
            result = [...result, <Square char={(word ? word.charAt(i) : undefined) ?? "⠀"} status={1} />];
        }

        return result;
    }

    return (<div className="Row">{rows()}</div>);
}
