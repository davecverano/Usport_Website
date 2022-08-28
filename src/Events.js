import Event from './Event.js';

const Events = (props) => {

    const events = props.events_list
    const type = props.type

    return (
        <div className="events">
            {
                events && 
                events.map((event, index) => {
                    return <Event event={event} index={index} type={type}></Event>
                })
                
            }
        </div>
      );
};
  
export default Events;