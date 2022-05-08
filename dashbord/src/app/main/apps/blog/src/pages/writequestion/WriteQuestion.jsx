import { useContext,useEffect, useState } from "react";
import "./writequestion.css";
import axios from "axios";
import { Context } from "../../context/Context";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import 'react-quill/dist/quill.bubble.css'; 
import EditorToolbar, { modules, formats } from "../write/editortoolbar";
import {useNavigate} from "react-router-dom";

import Header from "../../components/header/Header";
import Question from "../../components/questions/Questions";
import Sidebar from "../../components/sidebar/Sidebar";
import "./writequestion.css";
import { useLocation } from "react-router";
import Questions from "../../components/questions/Questions";


export default function WriteQuestion() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [questions, setQuestions] = useState([]);
  const { search } = useLocation();



  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get("/questions" + search);
      setQuestions(res.data);
    };
    fetchQuestions();
  }, [search]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      username: user.username,
      title,
      desc,
    };
    try {
      const res = await axios.post("/questions", newQuestion);
      window.location.replace("/question/" + res.data._id);
    } catch (err) {}
  };

  const handleChange=(value)=>{
    setDesc(value);
  }







  return (<div className="writequestionhome">
     
    <div className="writequestion">
     
      <form className="writequestionForm" onSubmit={handleSubmit}>
        <div className="writequestionFormGroup">
          
       
          <input
            type="text"
            placeholder="Title"
            className="writequestionInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>




        <div className="ql-editor ">
        <div ><EditorToolbar /></div>
        <div ><ReactQuill
          
            placeholder="What's your question..."
            type="text"
            
            value={desc}
            modules={modules}
            formats={formats}
            onChange={handleChange}
            
          /></div>
        
          
        </div>


        
     

        <button className="writequestionSubmit" type="submit">
          Publish
        
        </button>
      </form>

   
    
      <>
      
      <div className="writequestionhome">
        <Questions questions={questions} />
        
      </div>
    </>

    </div>
    </div>
  );
}


///////////////////////////////


