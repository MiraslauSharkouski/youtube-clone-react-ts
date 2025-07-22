import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  lazy,
  Suspense,
} from "react-router-dom";
import SkeletonLoader from "./components/SkeletonLoader";

// 📦 Lazy-загрузка страниц
const Home = lazy(() => import("./pages/Home"));
const VideoPage = lazy(() => import("./pages/VideoPage"));
const ChannelPage = lazy(() => import("./pages/ChannelPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<SkeletonLoader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/video/:id"
          element={
            <Suspense fallback={<SkeletonLoader />}>
              <VideoPage />
            </Suspense>
          }
        />
        <Route
          path="/channel/:id"
          element={
            <Suspense fallback={<SkeletonLoader />}>
              <ChannelPage />
            </Suspense>
          }
        />
        <Route
          path="/search"
          element={
            <Suspense fallback={<SkeletonLoader />}>
              <SearchPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
