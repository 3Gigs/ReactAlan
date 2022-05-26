import "./css/App.css";
import { Link } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <h1>Alan AI Apps</h1>
            <h3>By Huaxuan Yang</h3>
            <p>Here are some apps I've integrated with Alan AI</p>
            <h4>Navigate with Alan AI by clicking on the blue bottom in bottom right!</h4>
            <nav>
                <Link to="/Wordle">Wordle</Link>
            </nav>
        </div>
    );
}

export default App;
