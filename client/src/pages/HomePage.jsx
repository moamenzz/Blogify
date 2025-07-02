import BlogPosts from "../components/BlogPosts.jsx";
import FeaturedPosts from "../components/FeaturedPosts.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";

const HomePage = () => {
  // const { accessToken, username, roles, isAuthenticated, id } = useAuthStore();
  return (
    <>
      <div className="bg-base-200 px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-[24rem] mx-auto">
        {/* Header */}
        <div>
          <h1 className="flex justify-center text-center items-center text-6xl py-6 font-bold tracking-widest">
            BLOGIFY
          </h1>
        </div>
        {/* Featured Posts */}
        <FeaturedPosts />
        {/* All Blog Posts */}
        <BlogPosts />
      </div>
    </>
  );
};

export default HomePage;
