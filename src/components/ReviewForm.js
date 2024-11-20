import { useState } from "react";

export const ReviewForm = () => {
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    //e안에 input이 가지고 있는 속성들이 있음
    setTitle(e.target.value); //바뀐값
  };

  return (
    <form>
      <input value={title} onChange={handleTitleChange} />
      <input type="number" />
      <textarea />
    </form>
  );
};
