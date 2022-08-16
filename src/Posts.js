import Post from './Post.js';

const Posts = (props) => {

    const posts = props.posts_list
    

    return (
        <div className="posts">
            {
                posts && 
                posts.map((post, index) => {
                    return <Post post={post}></Post>
                })
                
            }
        </div>
      );
};
  
export default Posts;