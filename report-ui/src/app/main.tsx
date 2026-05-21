import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { DashboardPage } from "@pages/DashboardPage";
import { useReportStore } from "@entities/report/model/store";
import { getDevMock } from "./mocks";

function App() {
  const setReportData = useReportStore((state) => state.setReportData);

  React.useEffect(() => {
    const injected = (window as Window & { __BNDL_DATA__?: unknown }).__BNDL_DATA__;
    if (injected) {
      setReportData(injected as Parameters<typeof setReportData>[0]);
      return;
    }

    if (import.meta.env.DEV) {
      const mock = getDevMock();
      if (mock) {
        setReportData(mock);
      }
    }
  }, [setReportData]);

  return <DashboardPage />;
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
