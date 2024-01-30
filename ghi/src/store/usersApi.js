import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_HOST }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
