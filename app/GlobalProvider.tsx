"use client";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { store } from "@/redux/store";

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
      </Provider>
    </>
  );
}
