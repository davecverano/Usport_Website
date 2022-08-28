import './CreateProfileForm.css'
import './CreateForm.css'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'

const displayForm = (isPoppedup) => {
    document.getElementById('CreateProfileForm').style.display ='block'
    isPoppedup.current = true
}

function useOutsideAlerter(ref, isPoppedup, close, setImage) {
    useEffect(() => {     

    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && !isPoppedup.current) {
            document.getElementById('CreateProfileForm').style.display ='none'
            close()
            setImage(null)

        }else if(isPoppedup.current){
            isPoppedup.current = false
        }
    }
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("click", handleClickOutside);
    };
            

    }, [ref]);
  }


const CreateProfileForm = (props) => {

    const isPoppedup = useRef(false)
    const modalRef = useRef(null)
    const [image, setImage] = useState(null)
    useOutsideAlerter(modalRef, isPoppedup, props.closeModal, setImage);

    useEffect(() => {
        if(props.showModal){
           displayForm(isPoppedup)
        }
    }, [props.showModal])

    const uploadProfile = async (e) => {
        e.preventDefault()
        const name = document.getElementById('name').value
        const title = document.getElementById('title').value
        const data = new FormData();
        const auth_token = props.authToken
        data.append('image', image);

        console.log(data)

        await axios.post('/new_profile', data, {params: {
            "name": name,
            "title": title,
            "authToken": auth_token,
          }})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    }


    const uploadImage = (e) => {
        const img = e.target.files[0]
        setImage(img)
        e.target.value = ''
    }

    return ( 
        
        <div>
            <div id="CreateProfileForm" className="profile-modal" ref={modalRef}>
                <form className="modal-content" >
                    <div className="container">
                    <h3>Create a Profile</h3>
                    <hr/>
                    <div className="imgDisplay">
                        {   image ?        
                                <img className="formImage" src={URL.createObjectURL(image)} alt="profile" />
                            :   null
                        }
                    </div>
                    <div className="clearfix">
                            <input id="name" type="text" className="nameInput" />
                    </div>
                    <div className="clearfix">
                            <input id="title" type="text" className="titleInput" />
                    </div>
                    <hr/>
     
                        <div className="form_wrapper">
                                    <div className="options_wrapper">
                                    </div>
                                    <div className="form_buffer"></div>
                                    <div className="image_wrapper">
                                        <label for="files" className='uploadImage'><i className="fa fa-upload"></i></label>
                                        <input id="files" className="form-control" type="file" name="files" onChange={uploadImage}/>  
                                    </div>   
                                    <div className="upload_wrapper">
                                        <button className="signupbtn" onClick={uploadProfile}>Upload Profile</button>
                                    </div>                
                        </div>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default CreateProfileForm;