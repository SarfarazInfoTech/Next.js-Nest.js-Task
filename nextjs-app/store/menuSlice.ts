"use client";

import { BASE_URL } from "@/uitls/URL";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Menu {
  id?: string;
  name?: string;
  parentId?: string;
}

interface FormData {
  name: string;
  id: string;
}

interface MenuState {
  menus: Menu[];
  formData: FormData;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchMenus = createAsyncThunk<Menu[]>(
  "menu/fetchMenus",
  async () => {
    const response = await fetch(`${BASE_URL}/menus`);
    const data = await response.json();
    return data;
  }
);

export const addMenu = createAsyncThunk<Menu, Menu>(
  "menu/addMenu",
  async (menu) => {
    const response = await fetch(`${BASE_URL}/menus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu),
    });
    const data = await response.json();

    return data;
  }
);

export const updateMenu = createAsyncThunk<Menu, Menu>(
  "menu/updateMenu",
  async (menu) => {
    const response = await fetch(`${BASE_URL}/menus/${menu.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu),
    });
    const data = await response.json();

    return data;
  }
);

export const deleteMenu = createAsyncThunk<string, string>(
  "menu/deleteMenu",
  async (id) => {
    await fetch(`${BASE_URL}/menus/${id}`, {
      method: "DELETE",
    });

    return id;
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menus: [],
    formData: {
      name: "",
      id: "",
    },
    status: "idle",
    error: null,
  } as MenuState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenus.fulfilled, (state, action: PayloadAction<Menu[]>) => {
        state.status = "succeeded";
        state.menus = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addMenu.fulfilled, (state, action: PayloadAction<Menu>) => {
        state.menus.push(action.payload);
      })
      .addCase(updateMenu.fulfilled, (state, action: PayloadAction<Menu>) => {
        const index = state.menus.findIndex(
          (menu) => menu.id === action.payload.id
        );
        if (index !== -1) {
          state.menus[index] = action.payload;
        }
      })
      .addCase(deleteMenu.fulfilled, (state, action: PayloadAction<string>) => {
        state.menus = state.menus.filter((menu) => menu.id !== action.payload);
      });
  },
});

export const { setFormData } = menuSlice.actions;

export default menuSlice.reducer;
