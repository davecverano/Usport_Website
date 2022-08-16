import "./Navbar.css"
import { NavLink } from "react-router-dom";
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
        console.log(auth_token)
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
              <NavLink
                  to="gainesville"
              >
                  Gainesville
              </NavLink>
            </li>
            <li>
              <a href="/miami">Miami</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div
          className="navigation-social">
          <ul>
            <li>
            <a href="#" className="fa fa-twitter"></a>
            </li>
            <li>
            <a href="https://www.linkedin.com/in/jeremy-cohen-957507217/" className="fa fa-linkedin"></a>
            </li>
            <li>
            <a href="#" className="fa fa-instagram"></a>
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