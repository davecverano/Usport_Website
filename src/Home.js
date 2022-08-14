import './Home.css';
import Post from "./Post.js"

const Home = () => {

    

    return (
        <div class="new_post">
            <button type="button" class="new_post_button">Create Post</button>
            <Post></Post>
            <Post></Post>
        </div>
    );
};
  
export default Home;