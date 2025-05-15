import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Landing from "./pages/Landing.js";
import Search from "./pages/Search.js";
import Error from "./pages/Error.js";
import Lyrics from "./pages/Lyrics.js";

export default function App() {
  return (
    <div className="h-[100vh] w-full box-border mx-auto p-0">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/lyrics/:path" element={<Lyrics />} />
          <Route path="*" element={<Error name="404" message="Not found" />} />
        </Routes>
      </Router>
    </div>
  );
}
