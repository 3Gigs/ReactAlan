import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import {useEffect} from "react"

function App() {
  useEffect(() => {
    alanBtn({
        key: '2a2e14ccffff6276c88976e9550ffd182e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: (commandData) => {
          if (commandData.command === 'go:back') {
            // Call the client code that will react to the received command
          }
        }
    });
  }, []);
    return (
      <h1>Hello Alan!</h1>
  );
}

export default App;
