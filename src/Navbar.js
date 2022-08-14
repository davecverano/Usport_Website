import "./Navbar.css"
import { NavLink } from "react-router-dom";
  
const Navbar = () => {

    

    return (
        <nav className="navigation">
          <a href="/" className="brand-name">
            Logo Here
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
              <a href="#" class="fa fa-twitter"></a>
              </li>
              <li>
              <a href="https://www.linkedin.com/in/jeremy-cohen-957507217/" class="fa fa-linkedin"></a>
              </li>
              <li>
              <a href="#" class="fa fa-instagram"></a>
              </li>
            </ul>
          </div>
        </nav>
      );
};
  
export default Navbar;