import { useState } from "react"

export default function Board() {
    const [words, setWords] = useState(new Array(5));

    function addWord(word: string) {
        setWords([...word])
    }

    return (
        <h1>Would be Wordle board {words}</h1>
    )
}