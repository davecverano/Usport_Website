import Navbar from "./Navbar.js";
import "./Involvement.css"
import CreateContactForm from "./CreateContactForm.js";

const GetInvolved = () => {

    

    return (
      <div>
        <Navbar></Navbar>
        <div className="involvement-wrapper">
          <div className="contact-information-wrapper">
            <h1 className="contact-description">We are always looking for new adventures! Contact us and tell us what you think.</h1>
          </div>
          <div className="contact-form-wrapper">
            <CreateContactForm></CreateContactForm>
          </div>
          
        </div>
        
        
      </div>
       
      );
};
  
export default GetInvolved;