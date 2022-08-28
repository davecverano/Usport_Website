import './CreateEventForm.css'
import './CreateForm.css'
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'



const displayForm = (isPoppedup) => {
    document.getElementById('CreateEventForm').style.display ='block'
    isPoppedup.current = true
    
}

function useOutsideAlerter(ref, isPoppedup, close) {
    useEffect(() => {     

    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target) && !isPoppedup.current) {
            document.getElementById('CreateEventForm').style.display = 'none'
            close()

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


const CreateEventForm = (props) => {

    const isPoppedup = useRef(false)
    const modalRef = useRef(null)
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');
    useOutsideAlerter(modalRef, isPoppedup, props.closeModal);

    useEffect(() => {
        if(props.showModal){
           displayForm(isPoppedup)
        }
    }, [props.showModal])

    const uploadEvent = async (e) => {
        const heading = document.getElementById('heading').value
        const body = document.getElementById('body').value
        const auth_token = props.authToken
        const location = props.location
        const startHours = startTime.split(":")
        const endHours = endTime.split(":")
        const start_date_formatted = date.setHours(startHours[0], startHours[1], 0)
        const end_date_formatted = date.setHours(endHours[0], endHours[1], 0)

        await axios.post('/new_event',[], {params: {
            "heading": heading,
            "body": body,
            "authToken": auth_token,
            "startDate" : start_date_formatted,
            "endDate" : end_date_formatted,
            "location": location
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
            <div id="CreateEventForm" className="schedule-modal" ref={modalRef}>
                <form className="modal-content" >
                    <div className="container">
                    <h3>Create an Event</h3>
                    <hr/>
                    <div className="clearfix">
                            <input id="heading" type="text" className="headingInput" />
                    </div>
                    <div className="clearfix">
                            <textarea id="body" type="text" className="bodyInput" />
                    </div>
                    <hr/>
     
                        <div className="form_wrapper">
                                    <div className="options_wrapper">
                                        <DatePicker onChange={setDate} value={date}/>
                                        <TimePicker onChange={setStartTime} value={startTime} disableClock='true'/>
                                        <TimePicker onChange={setEndTime} value={endTime} disableClock='true'/>
                                    </div>
                                    <div className="form_buffer"></div>
                                    <div className="image_wrapper"></div>   
                                    <div className="upload_wrapper">
                                        <button className="signupbtn" onClick={uploadEvent}>Upload Event</button>
                                    </div>                
                        </div>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default CreateEventForm;