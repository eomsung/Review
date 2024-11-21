import { useState } from "react";
import { Rating } from "./Rating";
import "./ReviewList.css";
import { ReviewForm } from "./ReviewForm";

export const ReviewList = ({ items, onDelete, onUpdate, onUpdateSuccess }) => {
  const [editingId, setEditingId] = useState(null);
  const handleCancel = () => setEditingId(null);
  return (
    <ul>
      {items.map((item) => {
        // edit 부분 다시 공부하기
        if (item.id === editingId) {
          const { id, title, rating, content, imgUrl } = item;
          const initialValues = { title, rating, content };

          const handleSubmit = (formData) => onUpdate(id, formData);
          const handleSubmitSuccess = (review) => {
            onUpdateSuccess(review);
            setEditingId(null);
          };

          return (
            <li>
              <ReviewForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          );
        }

        return (
          <ReviewListItem
            key={item.id}
            item={item}
            onDelete={onDelete}
            onEdit={setEditingId}
          />
        );
      })}

      {/* 배열을 바꿀떄는 key값을 넣어햔다. */}
    </ul>
  );
};

const formatDate = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const ReviewListItem = ({ item, onDelete, onEdit }) => {
  const handleEditClick = () => {
    onEdit(item.id);
  };

  return (
    <div className="ReviewListItem">
      <img src={item.imgUrl} alt={item.title} className="ReviewListItem-img" />
      <div>
        <h1>{item.title}</h1>
        <Rating value={item.rating} />
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleEditClick}>수정</button>
        <button
          onClick={() => {
            onDelete(item.id);
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
};
