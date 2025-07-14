"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mode] = useState<'light' | 'dark'>("light");
  const theme = createTheme({
    palette: {
      mode,
      primary: { main: mode === "light" ? "#ffb300" : "#ff4081" },
      secondary: { main: mode === "light" ? "#ff4081" : "#7c4dff" },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
} 