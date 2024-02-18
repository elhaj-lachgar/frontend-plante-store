import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import CardProvider from "./context/CardProvider.tsx";
import { Toaster } from "react-hot-toast";
import PlanteProvider from "./context/PlanteProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CardProvider>
      <PlanteProvider>
        <BrowserRouter>
          <ChakraProvider>
            <App />
            <Toaster />
          </ChakraProvider>
        </BrowserRouter>
      </PlanteProvider>
    </CardProvider>
  </React.StrictMode>
);
