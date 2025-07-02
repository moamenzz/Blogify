import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import UnauthorizedPage from "./pages/UnauthorizedPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Navbar from "./components/Navbar.jsx";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";
import useThemeStore from "../store/useThemeStore.js";
import { useEffect } from "react";
import Footer from "./components/Footer.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import SinglePostPage from "./pages/SinglePostPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PostsPage from "./pages/PostsPage.jsx";

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Setze das Theme auf dem HTML root element
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/create-post" element={<CreatePostPage />}></Route>
          <Route path="/users/:id" element={<UserProfilePage />}></Route>
          <Route path="/posts/:slug" element={<SinglePostPage />}></Route>
          <Route path="/posts" element={<PostsPage />}></Route>
          <Route path="/unauthorized" element={<UnauthorizedPage />}></Route>
          <Route path="/*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
      <Footer />
    </div>
  );
}

export default App;
