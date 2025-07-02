import { Link } from "react-router-dom";
import { usePostStore } from "../../store/usePostStore.js";
import { useEffect } from "react";
import { formatDate } from "../../lib/dateUtils.js";
import Pagination from "../components/Pagination.jsx";
import SearchBar from "../components/SearchBar.jsx";

// const allPosts = [
//   {
//     id: 1,
//     title: "How collaboration makes us better designers",
//     description:
//       "Collaboration can make our teams stronger, and our individual designs better.",
//     author: "Mia Francisca",
//     authorImage:
//       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
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
//     authorImage:
//       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
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
//     authorImage:
//       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//     date: "Sunday, 1 Jan 2023",
//     image: "/post-cover2.png",
//     categories: ["Design", "UI/UX", "Team"],
//   },
//   {
//     id: 4,
//     title: "How collaboration makes us better designers",
//     description:
//       "Collaboration can make our teams stronger, and our individual designs better.",
//     author: "Mia Francisca",
//     authorImage:
//       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//     date: "Sunday, 1 Jan 2023",
//     image: "/post-cover2.png",
//     categories: ["Design", "UI/UX", "Team"],
//   },
//   {
//     id: 5,
//     title: "How collaboration makes us better designers",
//     description:
//       "Collaboration can make our teams stronger, and our individual designs better.",
//     author: "Mia Francisca",
//     authorImage:
//       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//     date: "Sunday, 1 Jan 2023",
//     image: "/post-cover2.png",
//     categories: ["Design", "UI/UX", "Team"],
//   },
// ];

const PostsPage = () => {
  const { fetchPosts, posts } = usePostStore();
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="bg-base-200 min-h-screen">
      <SearchBar />
      <div className="mx-auto max-w-[90rem] px-4 py-6">
        <h2 className="font-semibold text-2xl">All Posts</h2>
        <main className="flex flex-col space-y-6 p-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col md:flex-row bg-base-100 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-video overflow-hidden rounded-l-lg">
                <Link to={`/posts/${post.slug}`}>
                  <img
                    src={post.img}
                    alt="post-cover"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>
              <div className="space-y-5 p-5 px-8">
                {/* Author Info */}
                <div className="flex justify-between items-center min-w-[60rem] ">
                  <div className="flex flex-row gap-3 items-center">
                    <Link to={`/users/${post.user._id}`}>
                      <img
                        src={post.user.img}
                        alt="profile-pic"
                        className="w-10 h-10 overflow-hidden rounded-full"
                      />
                    </Link>
                    <div>
                      <Link
                        to={`/users/${post.user._id}`}
                        className="font-semibold hover:text-primary transition-colors"
                      >
                        {post.user.username}
                      </Link>
                    </div>
                  </div>
                  <span className="text-primary ">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
                {/* Title & Description */}
                <div>
                  <div className="space-y-2">
                    <Link to={`/posts/${post.slug}`} className="group">
                      <h2 className="group-hover:text-primary transition-colors text-2xl font-semibold">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post.desc}
                    </p>
                  </div>
                </div>
                {/* Categories */}
                <div className="flex flex-row gap-3">
                  {post.category.map((category, index) => (
                    <div key={index}>
                      <Link
                        to={`/search/category=${category.toLowerCase()}`}
                        className={`badge badge-sm ${
                          index === 0
                            ? "badge-primary"
                            : index === 1
                            ? "badge-secondary"
                            : "badge-neutral"
                        }`}
                      >
                        {category}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
      <Pagination />
    </div>
  );
};

export default PostsPage;
