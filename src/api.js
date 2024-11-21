const BASE_URL = "https://learn.codeit.kr/0259";

export const getReviews = async ({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) => {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const res = await fetch(`${BASE_URL}/film-reviews?${query}`);
  const data = await res.json();
  return data;
};

export const createReview = async (formData) => {
  const res = await fetch(`${BASE_URL}/film-reviews`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("fail");
  }
  const data = await res.json();
  return data;
};

export const updateReview = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("edit fail");
  const data = await res.json();
  return data;
};
