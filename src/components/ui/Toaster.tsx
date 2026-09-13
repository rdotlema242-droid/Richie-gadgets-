"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      theme="dark"
      richColors
      closeButton
      toastOptions={{
        style: {
          background: "#111111",
          border: "1px solid #27272a",
          color: "#fafafa",
        },
      }}
    />
  );
}
