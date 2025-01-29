// src/main.tsx

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./contexts/AppContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // if you get an error, don't auto-retry (react-query default setting)
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ChakraProvider value={defaultSystem}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <App />
          </ThemeProvider>
        </ChakraProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
