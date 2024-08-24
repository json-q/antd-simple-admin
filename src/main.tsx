import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "@/styles/index.css";

const App = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Suspense>
      <App />
    </Suspense>
  </HelmetProvider>,
);
