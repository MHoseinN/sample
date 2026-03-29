import http from "./http";

export const getProfilByUserIdApi = async (userId) => {
  const { data } = await http.get(`/profiles?userId=${userId}`);
  return data?.[0] || null;
};

export const upsertProfileApi = async (userId, payload) => {
  const { data:rows } = await http.get(`/profiles?userId=${userId}`);

  if (rows.length > 0) {
    const existing = rows[0];
    const { data } = await http.patch(`profiles/${existing.id}`, payload);
    return data;
  }

  const { data } = await http.post("/profiles", {
    userId,
    ...payload
  });

  return data;
};
