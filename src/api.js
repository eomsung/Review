const BASE_URL = "https://learn.codeit.kr/1234";

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
    throw new Error("리뷰 생성 실패 ㅜㅜ");
  }

  const data = await res.json();
  return data;
};

export const updateReview = async (id, formData) => {
  const res = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("리뷰 수정 실패 ㅜㅜ");

  const data = await res.json();
  return data;
};

export const deleteReview = async (id) => {
  const res = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("리뷰 삭제 실패");

  const body = await res.json();
  return body;
};
