import Navbar from "./Navbar.js";
import Profiles from "./Profiles.js"
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Leaders.css"
import CreateProfileForm from "./CreateProfileForm.js";
import loading_Gif from './resources/loading.gif'

const displayOverflow = (shouldDisplay) => {
  if(shouldDisplay){
      document.body.style.overflow ='scroll'
  }else{
      document.body.style.overflow ='hidden'
  }
  
}

const Leaders = () => {

  const [profiles, setProfiles] = useState(null);
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [authToken, setAuthToken] = useState(null)

    useEffect(() => {
      async function fetchProfiles() {
        setLoading(true)
        let request_string = '/get_profiles'
        const res = await axios.get(request_string)
        const profiles_list = res.data;
        setProfiles(profiles_list)
        setLoading(false)
      }
        fetchProfiles();
        let auth_token = sessionStorage.getItem("usport_auth_token");
          setAuthToken(auth_token)
    }, []);

    const displayModal = () => {
      setShowModal(true)
      displayOverflow(false)
  }

  const closeModal = () => {
      setShowModal(false)
      displayOverflow(true)
  }      

    return (

      
      <div>
        
        <Navbar></Navbar>
        {
          loading ? (
              <img src={loading_Gif} alt="loading..." />
              
          ) : (
          <div>
            <h1>Leaders</h1>
            <div className="leaders-wrapper">
              <CreateProfileForm authToken={authToken} showModal={showModal} closeModal={closeModal}></ CreateProfileForm>
              <Profiles profiles_list={profiles}></Profiles>
              { authToken != null ? ( <div className="profile-wrapper-button">
                <button type="button" className="new_profile_button" onClick={displayModal}><i class="fa fa-plus" aria-hidden="true"></i></button>
                </div>
                ) : (
                  null
                )
              }
            </div>
          </div>
          )
        }
      </div>
       
      );
};
  
export default Leaders;