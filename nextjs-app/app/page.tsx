"use client";

import MenusPage from "@/pages/menus/page";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function SyntheticV0PageForDeployment() {
  return (
    <Provider store={store}>
      <MenusPage />
    </Provider>
  );
}
