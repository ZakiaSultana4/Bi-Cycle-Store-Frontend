
import { baseApi } from "@/redux/app/baseApi";
import { IBikeResponse, TResponseRedux } from "@/types/types";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allProducts: builder.query({
      query: (params: {
        searchTerm?: string;
        category?: string;
        inStock?: string;
        minPrice?: number;
        maxPrice?: number;
        limit?: number;
        page?:number
      } = {}) => {
        const queryParams = new URLSearchParams();
    
        if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm);
        if (params.category) queryParams.append("category", params.category);
        if (params.inStock) queryParams.append("inStock", params.inStock);
        if (params.minPrice) queryParams.append("minPrice", params.minPrice.toString());
        if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.page) queryParams.append("page", params.page.toString());
    
        return {
          url: `/products?${queryParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<IBikeResponse[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["product"],
    }),
    

    specificProducts: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSpecificProductsQuery,
} = productApi;