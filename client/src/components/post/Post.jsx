import React from 'react';
import "./post.css";
import {Link} from "react-router-dom";

export default function Post({post}) {
  const PF = "http://localhost:5000/images/";//images under api
  return (
    <div className="post">
        {post.photo && (
            <img
            className="postImg"
            src={PF+post.photo}
            alt=""
            />
        )}
        {/* <img
            className="postImg"
            src='data:image/png;base64,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'
            alt=""
        /> */}
        <div className="postInfo">
            <div className="postCats">
                {post.categories.map((c)=>(
                    <span className="postCat">{c.name}</span>
                ))}    
                {/* <span className="postCat">Music</span> */}
                {/* <span className="postCat">Life </span> */}
            </div>
            <Link to={`/post/${post._id}`} className='link'>
                <span className="postTitle">{post.title}</span>
            </Link>
            {/* <span className="postTitle">{post.title}</span> */}
            <hr />
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="postDesc">
            {post.desc}
        </p>
    </div>
  )
}
/*  src='data:image/png;base64,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' */