import { baseApi } from "@/redux/app/baseApi";
import { IUser, TResponseRedux } from "@/types/types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    logOut: builder.mutation({
      query: (info) => ({
        url: "/auth/logout",
        method: "POST",
        body: info
      }),
      invalidatesTags: ['product', 'allUser', 'updateUserPass', 'order', 'revenue']
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/update-profile",
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ['updateUserPass']
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/update-password",
        method: "PATCH",
        body: data
      }),

    }),
    authMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ['updateUserPass']
    }),
    allUser: builder.query({
      query: () => ({
        url: `/auth/all-users`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<IUser[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["allUser"],
    }),
    updateBlockedUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/users/${id}/block`,
        method: "PATCH",
        body: data
      }),

      invalidatesTags: ["allUser"],
    }),
    makeAdmin: builder.mutation({
      query: (userId: string) => ({
        url: `/auth/users/${userId}/make-admin`,
        method: "PATCH",
      }),
      invalidatesTags: ["allUser"],
    }),

    deleteUser: builder.mutation({
      query: (userId: string) => ({
        url: `/auth/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allUser"],
    }),
  })

});

export const { useLoginMutation, useLogOutMutation, useSignUpMutation, useAuthMeQuery, useUpdateProfileMutation, useUpdatePasswordMutation, useAllUserQuery, useUpdateBlockedUserMutation, useMakeAdminMutation, useDeleteUserMutation } = authApi