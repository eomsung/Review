import { useAsync } from "./hooks/useAsync";
import { createReview, deleteReview, getReviews, updateReview } from "./api";
import { ReviewForm } from "./components/ReviewForm";
import { ReviewList } from "./components/ReviewList";
import { useState, useEffect } from "react";
import { LocaleProvider } from "./contexts/LocaleContext";
import { LocaleSelect } from "./components/LocaleSelect";
const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);
  // 빈배열이 들어가면 컴포넌트를 만들떄 한번만 실행
  //이걸 안쓰고 바로 함수를 실행하면 state가 변경되서 APP()가 무한호출이 됨
  // 두번째 인자의 값이 바뀔때마다 실행됨 [order] 을 넣으면 order가 바뀔때마다 실해됨
  // 값이 똑같으면 생략 가능

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  const handleDelete = async (id) => {
    await deleteReview(id);
    // const nextItems = items.filter((item) => item.id !== id);
    // setItems(nextItems);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const handleLoad = async (options) => {
    const data = await getReviewsAsync(options);
    if (!data) return;
    if (options.offset === 0) {
      setItems(data.reviews);
    } else {
      setItems((prev) => [...prev, ...data.reviews]);
    }
    setOffset(options.offset + data.reviews.length);
    setHasNext(data.paging.hasNext);
  };

  const handleLoadMore = async () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  // const handleLoadClick = async () => {
  //   const data = await getReviews();
  //   setItems(data.reviews);
  // };

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === review.id ? review : item))
    );
  };

  return (
    <LocaleProvider>
      <div>
        <LocaleSelect />
        <div>
          <button onClick={handleNewestClick}>최신순</button>
          <button onClick={handleBestClick}>베스트순</button>
        </div>
        <ReviewForm
          onSubmitSuccess={handleCreateSuccess}
          onSubmit={createReview}
        />
        <ReviewList
          items={items}
          onDelete={handleDelete}
          onUpdate={updateReview}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {hasNext && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더 보기
          </button>
        )}
        {loadingError?.message && <span>loadingError.message</span>}
        {/* <button onClick={handleLoadClick}>불러오기</button> */}
      </div>
    </LocaleProvider>
  );
}
export default App;
