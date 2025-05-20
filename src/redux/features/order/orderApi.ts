// features/order/orderApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOrderResponse, } from "@/types/types";

interface TStatusCountsResponse {
  data: { status: string; count: number }[];
}

export const orderApi = createApi({
  reducerPath: "orderApi", // unique reducer path for orderApi slice
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_SERVER_URI,
    prepareHeaders: (headers, { getState }) => {
      // Define RootState according to your store's state shape
      interface RootState {
        auth?: {
          token?: string;
        };
      }
      const token = (getState() as RootState).auth?.token; // adjust path to match your state
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["order", "revenue", "product"],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (queryParams) => {
        const query = new URLSearchParams(queryParams).toString();
        return `/orders?${query}`;
      },
    }),

    revenue: builder.query<{ data: { totalRevenue: number } }, void>({
      query: () => ({
        url: `/orders/revenue`,
        method: "GET",
      }),
      providesTags: ["revenue"],
    }),
    monthlyRevenue: builder.query<{ month: string; revenue: number }[], void>({
      query: () => ({
        url: "/orders/monthly-revenue",
        method: "GET",
      }),
      transformResponse: (response: { data: { month: string; revenue: number }[] }) =>
        response.data,
      providesTags: ["revenue"],
    }),

    userMonthlyBookings: builder.query<
      { month: number; count: number }[],
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: `/orders/user-monthly-bookings/${userId}`,
        method: "GET",
      }),
      transformResponse: (response: { data: { month: number; count: number }[] }) =>
        response.data,
    }),

createOrder: builder.mutation<
  { message: string; data: string },
  { products: { _id: string; quantity: number }[] }
>({
  query: (orderData) => ({
    url: "/orders",
    method: "POST",
    body: orderData,
  }),
  invalidatesTags: ["order", "product", "revenue"],
}),


    updateOrderStatus: builder.mutation<
      void,
      { orderId: string; status: string }
    >({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["order", "product", "revenue"],
    }),

    verifyOrder: builder.mutation<void, Partial<IOrderResponse>>({
      query: (data) => ({
        url: `/orders/verify`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["order", "product"],
    }),

    statusCounts: builder.query<{ status: string; count: number }[], void>({
      query: () => ({
        url: `/orders/status-counts`,
        method: "GET",
      }),
      transformResponse: (response: unknown) => (response as TStatusCountsResponse).data,
    }),


    weeklySales: builder.query<{ week: string; totalSales: number }[], void>({
      query: () => ({
        url: `/orders/weekly-sales`,
        method: "GET",
      }),
      transformResponse: (response: { data: { week: string; totalSales: number }[] }) =>
        response.data,
      providesTags: ["order"],
    }),

    dailyOrderCounts: builder.query<{ day: string; orders: number }[], void>({
      query: () => ({
        url: `/orders/daily-order-counts`,
        method: "GET",
      }),
      transformResponse: (response: { data: { day: string; orders: number }[] }) =>
        response.data,
      providesTags: ["order"],
    }),

    monthlySales: builder.query<
      { month: string; sales: number }[],
      { year?: number }
    >({
      query: (params) => {
        const queryString = params
          ? `?${new URLSearchParams({ year: String(params.year ?? "") })}`
          : "";
        return {
          url: `/orders/monthly-sales${queryString}`,
          method: "GET",
        };
      },
      transformResponse: (response: { data: { month: string; sales: number }[] }) =>
        response.data,
      providesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useVerifyOrderMutation,
  useRevenueQuery,
  useStatusCountsQuery,
  useWeeklySalesQuery,
  useDailyOrderCountsQuery,
  useMonthlySalesQuery,
  useUpdateOrderStatusMutation,
  useMonthlyRevenueQuery,
  useUserMonthlyBookingsQuery
} = orderApi;

