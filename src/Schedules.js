import "./Schedules.css"
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'
import Schedule from "./Schedule.js";
import CreateEventForm from "./CreateEventForm.js"
import Navbar from "./Navbar.js"
import Events from "./Events.js"
import axios from 'axios';
import loading_Gif from './resources/loading.gif'


const displayOverflow = (shouldDisplay) => {
  if(shouldDisplay){
      document.body.style.overflow ='scroll'
  }else{
      document.body.style.overflow ='hidden'
  }
  
}


const Schedules = () => {
  const [authToken, setAuthToken] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const { location } = useParams();

  useEffect(() => {
    async function fetchUpcomingEvents() {
      const res = await axios.get('/get_upcoming_events/' + location)
      const upcoming_events_list = res.data;
      setUpcomingEvents(upcoming_events_list) 
    }

    async function fetchPastEvents() {
      const res = await axios.get('/get_past_events/' + location)
      const past_events_list = res.data;
      setPastEvents(past_events_list) 
    }

    setLoading(true)
    fetchUpcomingEvents();
    fetchPastEvents();
    setLoading(false)
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
            <Schedule></Schedule>
            <CreateEventForm authToken={authToken} showModal={showModal} closeModal={closeModal} location={location}></ CreateEventForm>
            <hr className='schedules-break'/>
            {
              authToken != null ? (<button type="button" className="new_event_button" onClick={displayModal}><i class="fa fa-plus" aria-hidden="true"></i></button>)
              : (
                  null
              )
            }
            
              {
                  (upcomingEvents != null &&  upcomingEvents.length > 0) ? (
                  <div>
                    <h1>Upcoming Events</h1>
                    <Events events_list={upcomingEvents} type='upcoming'></Events>
                  </div>
                  )
                  : (
                      null
                  )
                  
              }
              
            
              {
                  (pastEvents != null && pastEvents.length > 0) ? (
                  <div>
                    <h1>Past Events</h1>
                    <Events events_list={pastEvents} type='past'></Events>
                  </div>
                  )
                  : (
                      null
                  )
                  
              }
          </div>
          )
        }
      </div>
      );
};
  
export default Schedules;