import './App.css';
import Home from "./Home.js"
import Schedules from "./Schedules.js"
import Involvement from "./Involvement.js"
import Leaders from "./Leaders.js"
import LogIn from "./LogIn.js"
import Error from "./Error.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <body>
            <Routes>
                <Route exact path="" element={<Home />}/>
                <Route path="home/:location" element={<Home/>} />
                <Route path="schedule/:location" element={<Schedules/>} />
                <Route path="involvement" element={<Involvement />} />
                <Route path="leaders" element={<Leaders />} />
                <Route path="signin" element={<LogIn />} />
                <Route path="*" element={<Error />} />
            </Routes>
        
      </body>
    </div>
    </BrowserRouter>
  );
}

export default App;
