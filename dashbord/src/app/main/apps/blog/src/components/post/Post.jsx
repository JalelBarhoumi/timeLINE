import "./post.css";
import { Link } from "react-router-dom";


import Parser from 'html-react-parser';

export default function Post({ post }) {
  
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      
      <a href={`/pages/blog/singlepost/${post._id}`}  id = "grayscale" >{post.photo && <img src={PF + post.photo} alt="" />}
</a>
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/pages/blog/singlepost/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}<br/>
          &emsp;&emsp;{new Date(post.createdAt).toLocaleTimeString()}
        </span>
      </div>
      <p className="postDesc">{Parser(post.desc)}</p>
    


    
    </div>
    
  );
}
