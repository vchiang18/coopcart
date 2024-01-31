import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_HOST }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({ url: "/users", credentials: "include" }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
