import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { mockProducts } from "@/lib/data/mockProducts";
import { Product } from "@/types/product";

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: mockProducts,
  filteredProducts: mockProducts,
  categories: [...new Set(mockProducts.map((product) => product.category))],
  status: "idle",
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (category === "all") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (product) => product.category === category
        );
      }
    },
    sortProducts: (
      state,
      action: PayloadAction<"price-asc" | "price-desc" | "rating" | "newest">
    ) => {
      const sortType = action.payload;
      switch (sortType) {
        case "price-asc":
          state.filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          state.filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          state.filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          state.filteredProducts.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        default:
          break;
      }
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm === "") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
      }
    },
  },
});

export const { filterByCategory, sortProducts, searchProducts } =
  productSlice.actions;

export default productSlice.reducer;