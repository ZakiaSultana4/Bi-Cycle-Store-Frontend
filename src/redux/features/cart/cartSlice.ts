import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface ICartItem {
  inStock: boolean;
  description: string;
  model: string;
  category: string;
  brand: string;
  image: string;
  _id: string; // Product ID
  name: string;
  price: number;
  selectQuantity: number;
  quantity: number;
}

interface CartState {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};
const toastId={id:"toastID"}
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      
      // console.log({ state: action });
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        toast.warning("Already added",toastId)
        // existingItem.selectQuantity += action.payload.selectQuantity;
      } else {
        state.items.push(action.payload);
        toast.success("Added to cart successfully",toastId);
           state.totalQuantity += action.payload.selectQuantity;
      state.totalPrice += action.payload.price * action.payload.selectQuantity;
      }
   
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item._id === itemId);
      if (existingItem) {
        state.totalQuantity -= existingItem.selectQuantity;
        state.totalPrice -= existingItem.price * existingItem.selectQuantity;
        state.items = state.items.filter((item) => item._id !== itemId);
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; selectQuantity: number }>
    ) {
      const { id, selectQuantity } = action.payload;
      const existingItem = state.items.find((item) => item._id === id);
      if (existingItem && selectQuantity > 0) {
        const quantityDifference = selectQuantity - existingItem.selectQuantity;
        existingItem.selectQuantity = selectQuantity;
        state.totalQuantity += quantityDifference;
        state.totalPrice += quantityDifference * existingItem.price;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;