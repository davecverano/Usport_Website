import './CreateContactForm.css'
import './CreateForm.css'
import axios from 'axios'





const CreateContactForm = (props) => {

    const uploadContact = async (e) => {
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const body = document.getElementById('body').value

        await axios.post('/new_contact', [], {params: {
            "name": name,
            "email": email,
            "body": body
          }})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    }


    return ( 
        
        <div>
            <div id="CreateContactForm" className="contact-modal">
                <form className="contact-modal-content" >
                    <div className="container">
                    <div className="clearfix">
                            <p>Name</p>
                            <input id="name" type="text" className="contactNameInput" />
                    </div>
                    <div className="clearfix">
                            <p>Email</p>
                            <input id="email" type="text" className="emailInput" />
                    </div>
                    <div className="clearfix">
                            <p>Message</p>
                            <textarea id="body" type="text" className="bodyInput" />
                    </div>
                    <hr/>
     
                        <div className="form_wrapper">
                                    <div className="options_wrapper">
                                    </div>
                                    <div className="form_buffer"></div>
                                    <div className="image_wrapper">
                                    </div>   
                                    <div className="upload_wrapper">
                                        <button className="signupbtn" onClick={uploadContact}>Upload Contact</button>
                                    </div>                
                        </div>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default CreateContactForm;