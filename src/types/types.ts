import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TUser = {
  name: string;
  email: string;
  role: string;
  userId: string;
};

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  statusCode: number;
  success: boolean;
  message: string;
};

export interface IBikeResponse {
  _id: string;
  image: string;
  name: string;
  brand: string;
  price: number;
  category: "Mountain" | "Road" | "Hybrid" | "Electric";
  model: string;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export type TProductDetails={
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: string;
  inStock: string;
  image: string;
  model: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface IOrderResponse {
  transaction: { id: string; transactionStatus: string };
  _id: string;
  user: {email:string};
  products: { quantity: number; product: TProductDetails }[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

export interface IUser {
  _id: string;
  profileImage: string;
  name: string;
  email: string;
  password: string;
  role?: "customer" | "admin";
  isBlocked?: boolean;
  address: string;
  phone: string;
}

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;