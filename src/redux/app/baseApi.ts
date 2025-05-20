/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser, logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_REACT_APP_SERVER_URI,  
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOption): Promise<any> => {
   let result = await baseQuery(args, api, extraOption);
  if (result?.error?.status === 401) {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URI}/auth/refresh-token`, {
      method: "post",
      credentials: "include",
    });
    const data= await res.json();
    if(data?.data?.token){
      const user= (api.getState() as RootState).auth.user
      api.dispatch(
        setUser({
          user,
          token:data.data.token
        })
      )
      result=await baseQuery(args, api, extraOption);
    }else{
      api.dispatch(logout())
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['product','allUser','updateUserPass','order','revenue'],
  endpoints: () => ({}),
});