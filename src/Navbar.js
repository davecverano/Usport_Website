import "./Navbar.css"
import { ReactComponent as Usport_Logo} from "./resources/Usport_Logo.svg"
import { useState, useEffect } from 'react';
  
const Navbar = () => {

  const [isSignedIn, setIsSignedIn] = useState(null)

  const signOut = () => {
    sessionStorage.removeItem("usport_auth_token");
    setIsSignedIn(false)   
    window.location.reload();
  }

  useEffect(() => {
        let auth_token = sessionStorage.getItem("usport_auth_token");
        if(auth_token){
          setIsSignedIn(true)
        }else{
          setIsSignedIn(false)
        }
      }, []);

  return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          <Usport_Logo width="100%" height="100%" ></Usport_Logo>
        </a>
        <div
          className="navigation-menu">
          <ul>
            <li>
              <div class="dropdown">
                <button class="dropbtn">Gainesville
                </button>
                <div class="dropdown-content">
                  <a href="/home/gainesville">Home</a>
                  <a href="/schedule/gainesville">Schedule</a>
                </div>
              </div>
            </li>
            <li>
              <div class="dropdown">
                <button class="dropbtn">Miami
                </button>
                <div class="dropdown-content">
                  <a href="/home/miami">Home</a>
                  <a href="/schedule/miami">Schedule</a>
                </div>
              </div>
            </li>
            <li>
              <div class="dropdown">
                <button class="dropbtn">Connect
                </button>
                <div class="dropdown-content">
                  <a href="/leaders">The Team</a>
                  <a href="/involvement">Contact</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div
          className="navigation-social">
          <ul>
            <li>
            <a href="https://m.facebook.com/groups/226500567363849" className="fa fa-facebook"></a>
            </li>
            <li>
            <a href="https://www.linkedin.com/in/usport-gainesville-x-miami-956407248/" className="fa fa-linkedin"></a>
            </li>
            <li>
            <a href="https://www.instagram.com/usportgainesville/" className="fa fa-instagram"></a>
            </li>
            <li>
              {
                isSignedIn ? (
                  <a href="#" className="fa fa-sign-out" onClick={signOut}></a>
                ) :
                (
                  null
                )
              }
            </li>
          </ul>
        </div>
      </nav>
    );
};
  
export default Navbar;