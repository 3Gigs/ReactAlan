import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Wordle from "./Routes/Wordle";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/Wordle" element={<Wordle />} />
        </Routes>
    </BrowserRouter>,
);
