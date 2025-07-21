// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VideoPage from "./pages/VideoPage";
import ChannelPage from "./pages/ChannelPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/video/:id"
          element={
            <VideoPage
              params={{
                id: "",
              }}
            />
          }
        />
        <Route
          path="/channel/:id"
          element={
            <ChannelPage
              params={{
                id: "",
              }}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchPage
              params={{
                id: "",
              }}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
