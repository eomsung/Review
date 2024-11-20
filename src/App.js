import { useEffect, useState } from "react";
import { ReviewList } from "./components/ReviewList";
import { getReviews } from "./api.js";

const LMIIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  useEffect(() => {
    handleLoad({ order, offset, limit: LMIIT });
  }, [order]);
  // 빈배열이 들어가면 컴포넌트를 만들떄 한번만 실행
  //이걸 안쓰고 바로 함수를 실행하면 state가 변경되서 APP()가 무한호출이 됨
  // 두번째 인자의 값이 바뀔때마다 실행됨 [order] 을 넣으면 order가 바뀔때마다 실해됨
  // 값이 똑같으면 생략 가능

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  const handleLoad = async (options) => {
    const data = await getReviews(options);
    if (options.offset === 0) {
      setItems(data.reviews);
    } else {
      setItems([...items, ...data.reviews]);
    }
    setOffset(options.offset + data.reviews.length);
    setHasNext(data.paging.hasNext);
  };
  const handleLoadMore = async () => {
    handleLoad({ order, offset, limit: LMIIT });
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
      <ReviewList items={items} onDelete={handleDelete} />
      {hasNext && <button onClick={handleLoadMore}>더 보기</button>}
      {/* <button onClick={handleLoadClick}>불러오기</button> */}
    </div>
  );
}

export default App;
