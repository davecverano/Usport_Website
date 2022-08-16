
const Input = (props) => {

    return (
        <div class="row">
            <label>{props.description}</label>
            <input type={props.type} placeholder={props.placeholder}/>
        </div>  
      );
};
  
export default Input;