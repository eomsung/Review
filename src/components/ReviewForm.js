import { useState } from "react";
import "./ReviewForm.css";

export const ReviewForm = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    //e안에 input이 가지고 있는 속성들이 있음
    setTitle(e.target.value); //바뀐값
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value || 0);
  };
  const handleContentChange = (e) => {
    //e안에 input이 가지고 있는 속성들이 있음
    setContent(e.target.value); //바뀐값
  };

  return (
    <form className="ReviewForm">
      <input value={title} onChange={handleTitleChange} />
      <input type="number" value={rating} onChange={handleRatingChange} />
      <textarea value={content} onChange={handleContentChange} />
    </form>
  );
};
