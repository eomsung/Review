export const getReviews = async () => {
  const res = await fetch("https://learn.codeit.kr/0259/film-reviews");
  const data = await res.json();
  console.log(data);
  return data;
};
