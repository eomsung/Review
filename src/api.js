export const getReviews = async ({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) => {
  const query = `order =${order}&offset=${offset}&limit=${limit}`;
  const res = await fetch(`https://learn.codeit.kr/0259/film-reviews?${query}`);
  const data = await res.json();
  return data;
};
