import './Home.css';
import Posts from "./Posts.js"
import CreatePostForm from "./CreatePostForm.js"
import Navbar from "./Navbar.js";
import axios from 'axios';
import { useState, useEffect } from 'react';
import loading_Gif from './resources/loading.gif'
import { useParams } from 'react-router-dom'


const displayOverflow = (shouldDisplay) => {
    if(shouldDisplay){
        document.body.style.overflow ='scroll'
    }else{
        document.body.style.overflow ='hidden'
    }
    
}

const Home = (props) => {
    const [posts, setPosts] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [authToken, setAuthToken] = useState(null)
    const { location } = useParams();


    useEffect(() => {
            async function fetchPosts() {
                setLoading(true)
                let request_string = '/get_posts/'
                if(location){
                    request_string += location
                }else{
                    request_string += 'all'
                }
                const res = await axios.get(request_string)
                const posts_list = res.data;
                setPosts(posts_list)
                setLoading(false)
            }
                fetchPosts();
                let auth_token = sessionStorage.getItem("usport_auth_token");
                setAuthToken(auth_token)
      }, []);
    

    const displayModal = () => {
        setShowModal(true)
        displayOverflow(false)
    }

    const closeModal = () => {
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
                            <CreatePostForm authToken={authToken} showModal={showModal} closeModal={closeModal}></ CreatePostForm>
                            {
                                authToken != null ? (<button type="button" className="new_post_button" onClick={displayModal}><i class="fa fa-plus" aria-hidden="true"></i></button>)
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