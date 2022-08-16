import './Home.css';
import Posts from "./Posts.js"
import CreatePostForm from "./CreatePostForm.js"
import Navbar from "./Navbar.js";
import axios from 'axios';
import { useState, useEffect } from 'react';
import loading_Gif from './resources/loading.gif'


const displayOverflow = (shouldDisplay) => {
    if(shouldDisplay){
        document.body.style.overflow ='scroll'
    }else{
        document.body.style.overflow ='hidden'
    }
    
}

const Home = () => {

    const [posts, setPosts] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [authToken, setAuthToken] = useState(null)

    useEffect(() => {
            async function fetchPosts() {
                setLoading(true)
                const res = await axios.get('/get_posts')
                const posts_list = res.data;
                setPosts(posts_list)
                setLoading(false)
            }
                fetchPosts();
                let auth_token = sessionStorage.getItem("usport_auth_token");
                setAuthToken(auth_token)
      }, []);
    

    const displaySignedURLModal = () => {
        setShowModal(true)
        displayOverflow(false)
    }

    const closeSignedURLModal = () => {
        setShowModal(false)
        displayOverflow(true)
    }      

    return (
        <div>
        <Navbar></Navbar>
            <div id="main_content" className="main">
                {
                    loading ? (
                        <img src={loading_Gif} alt="loading..." />
                        
                    ) : (
                        <div>
                            <CreatePostForm authToken={authToken} showModal={showModal} closeModal={closeSignedURLModal}></ CreatePostForm>
                            {
                                authToken != null ? (<button type="button" className="new_post_button" onClick={displaySignedURLModal}>New Post</button>)
                                : (
                                    null
                                )
                            }
                            
                            <Posts posts_list={posts}></Posts>
                        </div>
                    )
                }
            
            </div>
        </div>
    );
};
  
export default Home;