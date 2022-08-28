

import "./Event.css"

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];



const Event = (props) => {
  const event = props.event
  const index = props.index
  const type = props.type
  let startDate = new Date(parseInt(event['startDate']));
  let startTime = startDate.toLocaleTimeString('default', {
    hour: '2-digit',
    minute: '2-digit',
  });
  let endDate = new Date(parseInt(event['endDate']));
  let endTime = endDate.toLocaleTimeString('default', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const eventClick = () => {
    let eventDropdown = document.getElementById('eventDropdown' + type + index).style.display
    if(eventDropdown  == '' || eventDropdown  == 'none'){
      document.getElementById('eventDropdown' + type + index).style.display = 'block'
    }else{
      document.getElementById('eventDropdown' + type + index).style.display = 'none'
    }
  }


  return (
    <div>
      <div className='event'>
        <div className='event-date'><p className='event-date-month'>{monthNames[startDate.getMonth()]}</p><p className='event-date-day'>{startDate.getDate()}</p></div>
        <div className='event-time'><p>{startTime}</p><p>-</p><p>{endTime}</p></div>
        <div className='event-title'><p>{event['heading']}</p></div>
        <button className='event-dropdown' onClick={eventClick}><i class="fa fa-caret-down"></i></button>
      </div>
      <div class="event-dropdown-content" id={"eventDropdown" + type + index}>
          <p>{event['body']}</p>
        </div>
    </div>
     );
};

export default Event;