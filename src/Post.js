import './Post.css';

const Post = () => {

    

    return (
        <div className="post">
            <div className="post-container">
                <img className="image" src="https://i.kym-cdn.com/photos/images/original/001/707/893/06a.png" alt="post" />
                <h1 className="heading">Mem man</h1>
                <p>What is Lorem Ipsum?
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <div className="info">      
                </div>
            </div>
        </div>
      );
};
  
export default Post;