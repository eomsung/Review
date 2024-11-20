import { useState } from "react";

export const ReviewForm = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    //e안에 input이 가지고 있는 속성들이 있음
    setTitle(e.target.value); //바뀐값
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value) || 0;
  };
  const handleContentChange = (e) => {
    //e안에 input이 가지고 있는 속성들이 있음
    setContent(e.target.value); //바뀐값
  };

  return (
    <form>
      <input value={title} onChange={handleTitleChange} />
      <input type="number" onChange={handleRatingChange} />
      <textarea onChange={handleContentChange} />
    </form>
  );
};
