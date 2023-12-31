import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom'


export default function Home() {

  const [posts,setPosts] = useState([]);//start mei kuch fetch nahi kara hamne database se
  // const location = useLocation();

  // console.log(location);
  const {search} = useLocation();

  useEffect( ()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get("/posts"+search);
      // console.log(res);
      setPosts(res.data);
    }
    fetchPosts();
  }, [search])
  return (
    <>
        <Header />
        <div className='home'>
            <Posts posts={posts}/>
            <Sidebar />
        </div>
    </>
  );
}
