import {useState} from 'react';
import Calendar from 'react-calendar';
import './Schedule.css'


const Schedule = () => {
  const [date, setDate] = useState(new Date());



  return (
    <div className='calendar'>
      <div>
       <Calendar onChange={setDate} value={date}/>
      </div>
      <p>
      </p> 
    </div>
     );
};

export default Schedule;