import { Link } from "react-router-dom";
import { usePostStore } from "../../store/usePostStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { formatDate } from "../../lib/dateUtils.js";
import Pagination from "./Pagination.jsx";

const BlogPosts = () => {
  // Sample data array - in real app this would come from props or API
  // const posts = [
  //   {
  //     id: 1,
  //     title: "How collaboration makes us better designers",
  //     description:
  //       "Collaboration can make our teams stronger, and our individual designs better.",
  //     author: "Mia Francisca",
  //     date: "Sunday, 1 Jan 2023",
  //     image: "/post-cover2.png",
  //     categories: ["Design", "UI/UX", "Team"],
  //   },
  //   {
  //     id: 2,
  //     title: "How collaboration makes us better designers",
  //     description:
  //       "Collaboration can make our teams stronger, and our individual designs better.",
  //     author: "Mia Francisca",
  //     date: "Sunday, 1 Jan 2023",
  //     image: "/post-cover2.png",
  //     categories: ["Design", "UI/UX", "Team"],
  //   },
  //   {
  //     id: 3,
  //     title: "How collaboration makes us better designers",
  //     description:
  //       "Collaboration can make our teams stronger, and our individual designs better.",
  //     author: "Mia Francisca",
  //     date: "Sunday, 1 Jan 2023",
  //     image: "/post-cover2.png",
  //     categories: ["Design", "UI/UX", "Team"],
  //   },
  //   // ... imagine 5 more similar items
  // ].slice(0, 6); // Ensure we never show more than 6 posts

  const { fetchPosts, posts, isLoading, currentPage } = usePostStore();

  useEffect(() => {
    fetchPosts(currentPage);
  }, []);

  console.log(posts);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center px-10 font-semibold text-2xl text-gray-600">
        No posts available
      </div>
    );
  }

  return (
    <div className="py-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Recent Posts</h2>
        <Link
          to="/posts"
          className="group flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          View All Posts
          <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
        </Link>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post) => (
          <div key={post._id} className="flex flex-col space-y-4">
            {/* Image */}
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Link to={`/posts/${post.slug}`}>
                <img
                  src={post.img}
                  alt="cover"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>

            {/* Post Content */}
            <div className="space-y-4">
              {/* Author Info & Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 max-w-sm">
                  <Link to={`/users/${post.user._id}`}>
                    <img
                      alt="Author avatar"
                      src={post.user.img}
                      className="rounded-full w-10 h-10"
                    />
                  </Link>
                  <Link
                    to={`/users/${post.user._id}`}
                    className="font-semibold hover:text-primary transition-colors"
                  >
                    {post.user.username}
                  </Link>
                </div>
                <span className="text-primary font-medium text-sm">
                  {formatDate(post.createdAt)}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <Link to={`/posts/${post.slug}`} className="block group">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-base text-gray-600 line-clamp-2">
                  {post.desc}
                </p>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {post.category.map((category, index) => (
                  <Link
                    key={index}
                    className={`badge ${
                      index === 0
                        ? "badge-primary"
                        : index === 1
                        ? "badge-secondary"
                        : "badge-neutral"
                    }`}
                    to={`/search/category=${category.toLowerCase()}`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default BlogPosts;
