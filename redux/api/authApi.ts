import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { register } from "module";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query(body) {
        return {
          url: "/auth/register",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useRegisterMutation } = authApi;
