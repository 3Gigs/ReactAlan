import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wordle from "./Routes/Wordle";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Wordle />} />
        </Routes>
    </BrowserRouter>,
);
