import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singleQuestion.css";
import Parser from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import EditorToolbar, { modules, formats } from "../../pages/write/editortoolbar";



export default function SingleQuestion() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [question, setQuestion] = useState({});
 
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getQuestion = async () => {
      const res = await axios.get("/questions/" + path);
      setQuestion(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getQuestion();
  }, [path]);

  const handleChange=(value)=>{
    setDesc(value);
  }


  const handleDelete = async () => {
    try {
      await axios.delete(`/questions/${question._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/questions/${question._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="singleQuestion">
      <div className="singleQuestionWrapper">
       
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singleQuestionTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singleQuestionTitle">
            {title}
            {question.username === user?.username && (
              <div className="singleQuestionEdit">
                <i
                  className="singleQuestionIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singleQuestionIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singleQuestionInfo">
          <span className="singleQuestionAuthor">
            Asked by:
            <Link to={`/?user=${question.username}`} className="link">
              <b> {question.username}</b>
            </Link>
          </span>
          <span className="singleQuestionDate">
            {new Date(question.createdAt).toDateString()}
          </span>
        </div>

        
        {updateMode ? (
          <div className="tools">
          <EditorToolbar />
          <ReactQuill
            className="singleQuestionDescInput"
            type="text"
            value={desc}
            modules={modules}
            formats={formats}
            onChange={handleChange}
          /></div>
        ) : (
          <p className="singleQuestionDesc">{Parser(desc)}</p>
        )}


        {updateMode && (
          <button className="singleQuestionButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
