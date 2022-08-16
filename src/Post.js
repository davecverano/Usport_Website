import './Post.css';

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

const Post = (props) => {

    const post = props.post
    return (
        <div className="post">
            <div className="post-container">
                {   post['image'] ?        
                    <img className="image" src={URL.createObjectURL(b64toBlob(post['image']))} alt="post" />
                    :   null
                }
                
                <h1 className="heading">{post['heading']}</h1>
                <p>{post['body']}</p>
            </div>
        </div>
      );
};
  
export default Post;