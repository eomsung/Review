import { useState } from "react";
import "./ReviewForm.css";
import { FileInput } from "./FileInput.js";
import { RatingInput } from "./RatingInput.js";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

export const ReviewForm = ({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmitSuccess,
  onSubmit,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState(initialValues);
  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);
    // Object.entries이용하면 긴단하게 가능
    try {
      setLoading(true);
      setError(null);
      const result = await onSubmit(formData);
      onSubmitSuccess(result.review);
      resetValues();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const resetValues = () => {
    setValues(INITIAL_VALUES);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
        onChange={handleChange}
      />
      {/* fileinput은 비제어 컴포넌트 그래서 초기화 버튼을 눌러도 파일은 초기화가 안됨*/}
      <input name="title" value={values.title} onChange={handleInputChange} />
      <RatingInput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />

      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      {/* <button onClick={resetValues}>값 초기화</button> */}
      {/* 제어컴포넌트 초기화 버튼 */}
      <button type="submit" disabled={loading}>
        확인
      </button>
      {onCancel && <button onClick={onCancel}>취소</button>}
      {error?.message && <div>{error.message}</div>}
    </form>
  );
};
