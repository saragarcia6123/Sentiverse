import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Landing from "./pages/Landing.js";
import Search from "./pages/Search.js";

export default function App() {
  return (
    <div className="h-[100vh] box-border max-w-[1280px] mx-auto p-0">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}
