import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import PageNotFound from "./features/404/PageNotFound";
import HomePage from "./features/home/pages/HomePage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={"App"}>
          <div className="wrapper">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}
