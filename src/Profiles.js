import Profile from './Profile.js';

const Profiles = (props) => {

    const profiles = props.profiles_list
    
    console.log(props)

    return (
        <div className="profiles">
            {
                profiles && 
                profiles.map((profile, index) => {
                    return <Profile profile={profile}></Profile>
                })
                
            }
        </div>
      );
};
  
export default Profiles;