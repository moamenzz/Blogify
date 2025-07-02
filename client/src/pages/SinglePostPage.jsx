import { Link, useParams } from "react-router-dom";
import { usePostStore } from "../../store/usePostStore.js";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useEffect } from "react";
import { formatDate } from "../../lib/dateUtils.js";
import { Loader } from "lucide-react";

// const recentPosts = [
//   // Fetch posts using most recent
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
//   // More posts here
// ].slice(0, 6); // Only show 6 recent posts

// const mainPost = [
//   {
//     id: 1,
//     title: "UX review presentations",
//     author: "Mia Francisca",
//     authorImage:
//       "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
//     date: "Sunday, 1 Jan 2023",
//     image: "/post-cover.png",
//     categories: ["Design", "Team"],
//     postContent:
//       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum odit voluptatum ea non, aut ab, minima molestias placeat quod, ex praesentium asperiores qui molestiae reiciendis fuga esse iste in obcaecati ",
//   },
// ];

const SinglePostPage = () => {
  const { recentPosts, fetchPosts, isLoading, error } = usePostStore();
  // Recent Post Fetching
  useEffect(() => {
    fetchPosts();
  }, []);

  // Main Post Rendering
  const { fetchSinglePost, mainPost } = usePostStore();
  const { slug } = useParams();

  useEffect(() => {
    fetchSinglePost(slug);
  }, [slug]);

  const { id } = useAuthStore();
  const { deletePost } = usePostStore();
  const authenticatedToDelete = mainPost?.user?._id === id;

  const handleDeletePost = async () => {
    try {
      await deletePost(slug, id);
    } catch (e) {
      console.log(error);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  if (!mainPost) return <div>Post not found</div>;

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-[90rem] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Posts Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-8">
            <h2 className="text-2xl font-semibold">Recent blog posts</h2>

            <div className="space-y-8">
              {recentPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-base-100 rounded-xl p-4 space-y-4"
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <Link to={`/posts/${post.slug}`}>
                      <img
                        src={post.img}
                        alt="post-cover"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>

                  {/* Author Info & Date */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Link to={`/users/${post.user._id}`}>
                        <img
                          src={post.user.img}
                          alt="profile-pic"
                          className="rounded-full w-8 h-8"
                        />
                      </Link>
                      <Link to={`/users/${post.user._id}`} className="group">
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {post.user.username}
                        </span>
                      </Link>
                    </div>
                    <span className="text-sm text-primary">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <Link to={`/posts/${post.slug}`} className="group">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {post.desc}
                    </p>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2">
                    {post.category.map((category, index) => (
                      <Link
                        key={index}
                        className={`badge badge-sm ${
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
              ))}
            </div>
          </aside>

          {/* Main Post Content */}
          <main className="lg:col-span-8 xl:col-span-9 bg-base-100 rounded-xl">
            <article key={mainPost.id} className="space-y-8">
              {/* Post cover */}
              <div className="aspect-[21/9] overflow-hidden rounded-t-xl">
                <img
                  src={mainPost.img}
                  alt="mainPost-cover"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 space-y-8">
                {/* Author Info & Date */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Link to="/users/user-id">
                      <img
                        src={mainPost?.user?.img}
                        alt="profile-pic"
                        className="rounded-full w-10 h-10"
                      />
                    </Link>
                    <div className="space-y-1">
                      <Link to="/users/user-id" className="group">
                        <h2 className="font-semibold group-hover:text-primary transition-colors">
                          {mainPost?.user?.username}
                        </h2>
                      </Link>
                      <span className="text-sm text-primary">
                        {formatDate(mainPost.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {Array.isArray(mainPost?.category) &&
                      mainPost.category.map((category, index) => (
                        <Link
                          key={index}
                          className={`badge ${
                            index === 0 ? "badge-primary" : "badge-secondary"
                          }`}
                          to={`/search/category=${category.toLowerCase()}`}
                        >
                          {category}
                        </Link>
                      ))}
                  </div>
                </div>

                {/* Title & Content */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">{mainPost.title}</h1>
                    <span className="text-md text-gray-600 line-clamp-2 ">
                      <span className="text-xl text-primary line-clamp-2 text-center">
                        {mainPost.visit}
                      </span>
                      Views
                    </span>
                  </div>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: mainPost.content }}
                  />
                </div>
              </div>

              {/* Delete Post */}
              {authenticatedToDelete && (
                <div className="pt-6">
                  <span
                    className="text-red-500 line-clamp-2 text-lg font-semibold text-center cursor-pointer hover:text-red-400 hover:opacity-70"
                    onClick={handleDeletePost}
                  >
                    Delete Post
                  </span>
                </div>
              )}
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
