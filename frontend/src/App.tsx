import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Landing from "./pages/Landing.js";
import Search from "./pages/Search.js";
import Error from "./pages/Error.js";
import Lyrics from "./pages/Lyrics.js";

export default function App() {
  return (
    <div className="size-full h-[100vh] flex flex-col box-border p-0">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/lyrics/:path" element={<Lyrics />} />
          <Route path="*" element={<Error name="404" message="Not found" />} />
        </Routes>
      </Router>
      {/* Background layer */}
      <div
        className="opacity-20"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -20,
          width: "100%",
          height: "100%",
        }}
      />
      {/* Tint Overlay */}
      <div
        className="light-mode dark:dark-mode"
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -10,
        }}
      />
    </div>
  );
}
