import logo from './logo.svg';
import './App.css';
import Main from "./components/Main";
import Welcome from "./components/Welcome";
import {useEffect, useState} from "react";

function App() {
    const [welcome, setWelcome] = useState(true)

    useEffect(()=>{

        setTimeout(()=>{setWelcome(!welcome)},3500)
    },[])
    return (
        <div className="app">
            {
                welcome
                &&
                <Welcome/>
            }
            <Main/>
        </div>
    );
}

export default App;
