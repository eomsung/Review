import { useState } from "react";
import "./RatingInput.css";
import { Rating } from "./Rating";

export const RatingInput = ({ name, value, onChange }) => {
  const [rating, setRating] = useState(value); // hover시 미리보기 용도 여기 다시 공부하기 어렵네
  const handleSelect = (nextValue) => onChange(name, nextValue);
  const handleMouseOut = () => setRating(value);
  return (
    <Rating
      className="RatingInput"
      value={rating}
      onHover={setRating}
      onSelect={handleSelect}
      onMouseOut={handleMouseOut}
    />
  );
};
