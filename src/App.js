import { useEffect, useState } from "react";
import { ReviewList } from "./components/ReviewList";
import { getReviews } from "./api.js";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");

  useEffect(() => {
    handleLoad();
  }, []);
  // 빈배열이 들어가면 컴포넌트를 만들떄 한번만 실행

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  const handleLoad = async () => {
    const data = await getReviews();
    setItems(data.reviews);
  };
  // const handleLoadClick = async () => {
  //   const data = await getReviews();
  //   setItems(data.reviews);
  // };

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {/* <button onClick={handleLoadClick}>불러오기</button> */}
    </div>
  );
}

export default App;
