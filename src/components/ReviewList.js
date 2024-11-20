import "./ReviewList.css";
export const ReviewList = ({ items, onDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <ReviewListItem key={item.id} item={item} onDelete={onDelete} />
      ))}
      {/* 배열을 바꿀떄는 key값을 넣어햔다. */}
    </ul>
  );
};

const formatDate = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const ReviewListItem = ({ item, onDelete }) => (
  <div className="ReviewListItem">
    <img src={item.imgUrl} alt={item.title} className="ReviewListItem-img" />
    <div>
      <h1>{item.title}</h1>
      <p>{item.rating}</p>
      <p>{formatDate(item.createdAt)}</p>
      <p>{item.content}</p>
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

//ul tag : unordered list
//ol tag : ordered list
