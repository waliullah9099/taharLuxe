import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockOrders } from "@/lib/data/mockOrders";
import { Order } from "@/types/order";

interface OrderState {
  orders: Order[];
  userOrders: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrderState = {
  orders: mockOrders,
  userOrders: [],
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: string }>
    ) => {
      const { id, status } = action.payload;
      const order = state.orders.find(order => order.id === id);
      if (order) {
        order.status = status;
      }
    },
    fetchUserOrders: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.userOrders = state.orders.filter(order => order.userId === userId);
    },
  },
});

export const { addOrder, updateOrderStatus, fetchUserOrders } = orderSlice.actions;

export default orderSlice.reducer;