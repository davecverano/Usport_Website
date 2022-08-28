import './Profile.css';

const b64toBlob = (b64Data, contentType='img', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }


const Profile = (props) => {
    const profile = props.profile
    return (
        <div className="profile-wrapper">
            <div className='profile-image'><img className="profile-image" src={URL.createObjectURL(b64toBlob(profile['image']))} alt="profile" /></div>
            <div><p className='profile-name'>{profile['name']}</p></div>
            <div><p className='profile-title'>{profile['title']}</p></div>
        </div>
      );
};
  
export default Profile;