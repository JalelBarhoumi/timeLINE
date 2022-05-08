import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import EditorToolbar, { modules, formats } from "../../pages/write/editortoolbar";
import Icon from '@material-ui/icons';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';




export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname;
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);



  const valeur =localStorage.getItem("emailvalue");
  const [data, setData] = useState();
  const test = (x) => x + 1;

  // useEffect(() => {
  
  // }, []);

  // if (!data) {
  //   return null;
  // }

  // const { general, work, contact, groups, friends } = data;

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/blogposts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);

    };
    getPost();
  }, [path]);

  const handleChange=(value)=>{
    setDesc(value);
  }


  const handleDelete = async () => {
    try {
      await axios.delete(`/blogposts/${post._id}`, {
        data: { name: data.name },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/blogposts/${post._id}`, {
        name:data.name,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.name === data?.name && (
              <div >
                <i
                 
                  onClick={() => setUpdateMode(true)}
                >oijoi</i>
                <DeleteForeverIcon
                 
                  onClick={handleDelete}
                />
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?data=${post.name}`} className="link">
              <b> {post.name}</b>
             
            </Link>
          </span>
         
          
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
     
          </span>
        </div>

        
        {updateMode ? (
          <div className="tools">
          <EditorToolbar />
          <ReactQuill
            className="singlePostDescInput"
            type="text"
            value={desc}
            modules={modules}
            formats={formats}
            onChange={handleChange}
          /></div>
        ) : (
          <p className="singlePostDesc">{Parser(desc)}</p>
        )}


        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>

{/* 
<motion.div >
<CardContent>
<div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Gender</Typography>
                <Typography>{data.gender}</Typography>
                
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Birthday</Typography>
                <Typography>{data.birthday}</Typography>
              </div>
</CardContent>
</motion.div> */}


    </div>
  );
}
