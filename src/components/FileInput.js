import { useEffect, useRef, useState } from "react";

export const FileInput = ({ name, value, onChange, initialPreview }) => {
  const inputRef = useRef();
  const [preview, setPreview] = useState(initialPreview);
  // ref값을 사용할때는 항상 if(ref.current)로 체크해주는것이 좋음

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initialPreview);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value, initialPreview]); // 이부분이 제일 어렵네 여기가 좀 특이함 returun이 나중값을 가지고 실행함

  const handleChange = (e) => {
    onChange(name, e.target.files[0]);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;
    inputNode.value = "";
    onChange(name, null);
  };

  return (
    <div>
      <img src={preview} alt="preview" />
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
      />
      {value && <button onClick={handleClearClick}>x</button>}
    </div>
  );
};
