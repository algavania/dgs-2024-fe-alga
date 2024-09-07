import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./features/404/PageNotFound";
import HomePage from "./features/home/HomePage";

export default function App() {
  return (
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
  );
}
