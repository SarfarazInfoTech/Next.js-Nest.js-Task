"use client";

import "./globals.css";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <div className="flex h-screen bg-white">
            <Sidebar />
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </body>
      </html>
    </Provider>
  );
}
