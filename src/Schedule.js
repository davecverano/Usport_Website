import {useState} from 'react';
import Calendar from 'react-calendar';
import './Schedule.css'

const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

const isSameDay = (event, date) => {
  const dDate = new Date(parseInt(event['startDate']))
  if(datesAreOnSameDay(dDate, date)){
    return true
  }else{
    return false
  }
}

const Schedule = (props) => {
  const [date, setDate] = useState(new Date());
  const eventsToAddClassTo = props.events
  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (eventsToAddClassTo.find(event => isSameDay(event, date))) {
        return 'highlight'
      }
    }
  }

  return (
    <div className='calendar'>
      <div>
       <Calendar onChange={setDate} value={date} tileClassName={tileClassName}/>
      </div>
      <p>
      </p> 
    </div>
     );
};

export default Schedule;