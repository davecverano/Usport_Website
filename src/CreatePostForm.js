import './CreatePostForm.css'
import './CreateForm.css'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'

const displayForm = (isPoppedup) => {
    document.getElementById('CreatePostForm').style.display ='block'
    isPoppedup.current = true
}

function useOutsideAlerter(ref, isPoppedup, close, setImage) {
    useEffect(() => {     

    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && !isPoppedup.current) {
            document.getElementById('CreatePostForm').style.display ='none'
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


const CreatePostForm = (props) => {

    const isPoppedup = useRef(false)
    const modalRef = useRef(null)
    const [image, setImage] = useState(null)
    const [display, setDisplay] = useState(new Set([]))
    useOutsideAlerter(modalRef, isPoppedup, props.closeModal, setImage);

    useEffect(() => {
        if(props.showModal){
           displayForm(isPoppedup)
        }
    }, [props.showModal])

    const uploadPost = async (e) => {
        const heading = document.getElementById('heading').value
        const body = document.getElementById('body').value
        const data = new FormData();
        const auth_token = props.authToken
        let location = 'all'
        
        if(display.size == 1){
            location = Array.from(display)[0];
        }

        data.append('image', image);

        await axios.post('/new_post', data, {params: {
            "heading": heading,
            "body": body,
            "authToken": auth_token,
            "location": location
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

    const changeDisplay = (e) => {
        if(display.has(e.target.value)){
            display.delete(e.target.value)
            setDisplay(display)
        }else{
            display.add(e.target.value)
            setDisplay(display)
        }
    }

    return ( 
        
        <div>
            <div id="CreatePostForm" className="home-modal" ref={modalRef}>
                <form className="modal-content" >
                    <div className="container">
                    <h3>Create a Post</h3>
                    <hr/>
                    <div className="imgDisplay">
                        {   image ?        
                                <img className="formImage" src={URL.createObjectURL(image)} alt="post" />
                            :   null
                        }
                    </div>
                    <div className="clearfix">
                            <input id="heading" type="text" className="headingInput" />
                    </div>
                    <div className="clearfix">
                            <textarea id="body" type="text" className="bodyInput" />
                    </div>
                    <hr/>
     
                        <div className="form_wrapper">
                                    <div className="options_wrapper">
                                        <input type="checkbox" id="location_gainesville" name="location_gainesville" value="gainesville" onChange={changeDisplay}/>
                                        <label for="location_gainesville" className='location_options_label'> Gainesville</label>
                                        <div className='options_wrapper_buffer'></div>
                                        <input type="checkbox" id="location_miami" name="location_miami" value="miami" onChange={changeDisplay}/>
                                        <label for="location_miami" className='location_options_label'> Miami</label>
                                    </div>
                                    <div className="form_buffer"></div>
                                    <div className="image_wrapper">
                                        <label for="files" className='uploadImage'><i className="fa fa-upload"></i></label>
                                        <input id="files" className="form-control" type="file" name="files" onChange={uploadImage}/>  
                                    </div>   
                                    <div className="upload_wrapper">
                                        <button className="signupbtn" onClick={uploadPost}>Upload Post</button>
                                    </div>                
                        </div>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default CreatePostForm;