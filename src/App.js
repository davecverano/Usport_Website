import './App.css';
import Navbar from "./Navbar.js";
import Home from "./Home.js"
import Gainesville from "./Gainesville.js"
import Miami from "./Miami.js"
import Contact from "./Contact.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header><Navbar></Navbar></header>
      <body>
        
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/gainesville" element={<Gainesville/>} />
                <Route path="/miami" element={<Miami />} />
                <Route path="/contact" element={<Contact />} />
                
            </Routes>
        
      </body>
    </div>
    </BrowserRouter>
  );
}

export default App;
