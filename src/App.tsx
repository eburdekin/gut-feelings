// src/App.tsx

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./contexts/AppContext";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Test from "./pages/Test";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AuthRedirect from "./pages/AuthRedirect";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // if you get an error, don't auto-retry (react-query default setting)
      retry: 0,
    },
  },
});

const theme = createTheme({
  // fontFamily: "Montserrat, sans-serif",
  // defaultRadius: "md",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <MantineProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Test />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/auth/redirect" element={<AuthRedirect />} />
              <Route path="/dashboard" element={<p>Dashboard</p>} />
              <Route />
            </Routes>
          </Router>
        </MantineProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
