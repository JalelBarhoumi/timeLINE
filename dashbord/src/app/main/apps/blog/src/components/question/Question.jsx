import "./question.css";
import { Link } from "react-router-dom";
import Parser from 'html-react-parser';

export default function Question({ question }) {
  
  return (
    <div className="question">
 
      <div className="questionInfo">
        <div className="questionCats">
          {question.categories.map((c) => (
            <span className="questionCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/question/${question._id}`} className="link">
          <span className="questionTitle">{question.title}</span>
        </Link>
        <hr />
        <span className="questionDate">
          {new Date(question.createdAt).toDateString()}<br/>
          &emsp;&emsp;{new Date(question.createdAt).toLocaleTimeString()}
        </span>
      </div>
      <p className="questionDesc">{Parser(question.desc)}</p>
    


    
    </div>
    
  );
}
