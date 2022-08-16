import './App.css';
import Home from "./Home.js"
import Gainesville from "./Gainesville.js"
import Miami from "./Miami.js"
import Contact from "./Contact.js"
import LogIn from "./LogIn.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <body>
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route path="/gainesville" element={<Gainesville/>} />
                <Route path="/miami" element={<Miami />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signin" element={<LogIn />} />
            </Routes>
        
      </body>
    </div>
    </BrowserRouter>
  );
}

export default App;
