import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";

const QuizPage = lazy(() => import("./pages/QuizPage"));
const AnalyzingPage = lazy(() => import("./pages/AnalyzingPage"));
const EmailCapturePage = lazy(() => import("./pages/EmailCapturePage"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const DataDashboard = lazy(() => import("./pages/DataDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/analyzing" element={<AnalyzingPage />} />
          <Route path="/email" element={<EmailCapturePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/data" element={<DataDashboard />} />
          <Route path="/:slug" element={<QuizPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
