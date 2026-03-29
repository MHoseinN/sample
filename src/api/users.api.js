import http from "./http";

export const getUsersApi = async () => {
  const { data } = await http.get("/users");
  return data;
};

export const getUserByIdApi = async (id) => {
  const { data } = await http.get(`/users/${id}`);
  return data;
};

export const createUserApi = async (payload) => {
  const now = new Date().toISOString();
  const reqBody = {
    ...payload,
    createdAt: now,
    updatedAt: now,
  };

  const { data } = await http.post("/users", reqBody);
  return data;
};

export const updateUserApi = async ({ id, payload }) => {
  const now = new Date().toISOString().replace;
  const reqBody = {
    ...payload,
    updatedAt: now,
  };

  const { data } = await http.patch(`/users/${id}`, reqBody);
  return data;
};

export const deleteUserApi = async (id) => {
  await http.delete(`/users/${id}`);
};
