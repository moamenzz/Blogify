import { Link } from "react-router-dom";
import { usePostStore } from "../../store/usePostStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { formatDate } from "../../lib/dateUtils";

const FeaturedPosts = () => {
  const { featuredPosts, isLoading, fetchFeaturedPosts } = usePostStore();

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  console.log(featuredPosts);

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );

  if (!featuredPosts || featuredPosts.length === 0)
    return (
      <div>
        <div className="text-center text-lg font-semibold text-gray-600">
          No featured posts available
        </div>
      </div>
    );

  return (
    <div className="pt-16 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-semibold pb-8">Featured Posts</h2>
      </div>

      {/* Main Featured Posts Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Featured Post (Large) */}
        <div className="space-y-4">
          {featuredPosts[0] && (
            <>
              <div className="aspect-video w-full overflow-hidden rounded-xl">
                <Link to={`/posts/${featuredPosts[0].slug}`}>
                  <img
                    src={featuredPosts[0].img}
                    alt="cover-image"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>

              <div className="space-y-4">
                {/* Author Info & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Link to={`/users/${featuredPosts[0].user._id}`}>
                      <img
                        alt="Author avatar"
                        src={featuredPosts[0].user.img}
                        className="rounded-full w-10 h-10"
                      />
                    </Link>
                    <Link
                      to={`/users/${featuredPosts[0].user._id}`}
                      className="font-semibold"
                    >
                      {featuredPosts[0].user.username}
                    </Link>
                  </div>
                  <span className="text-primary font-medium">
                    {formatDate(featuredPosts[0].createdAt)}
                  </span>
                </div>

                {/* Post Title & Description */}
                <div className="space-y-2">
                  <Link
                    to={`/posts/${featuredPosts[0].slug}`}
                    className="group"
                  >
                    <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                      {featuredPosts[0].title}
                    </h3>
                  </Link>
                  <p className="text-base text-gray-600">
                    {featuredPosts[0].desc}
                  </p>
                </div>

                {/* Categories */}
                <div className="flex gap-2">
                  {featuredPosts[0].category.map((category, index) => (
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
            </>
          )}
        </div>

        {/* Right Side Posts (Smaller) */}
        <div className="space-y-6">
          {featuredPosts.slice(1, 4).map((post) => (
            <div key={post._id} className="flex gap-6 items-start">
              <div className="w-48 aspect-video flex-shrink-0 rounded-lg overflow-hidden">
                <Link to={`/posts/${post.slug}`}>
                  <img
                    src={post.img}
                    alt="cover-image"
                    className="w-full h-full object-cover "
                  />
                </Link>
              </div>

              <div className="space-y-3 flex-grow">
                <div className="flex items-center gap-3">
                  <Link to={`/users/${post.user._id}`}>
                    <img
                      alt="Author avatar"
                      src={post.user.img}
                      className="rounded-full w-8 h-8"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <Link
                      to={`/users/${post.user._id}`}
                      className="font-medium"
                    >
                      {post.user.username}
                    </Link>
                    <span className="text-sm text-primary">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </div>

                <Link to={`/posts/${post.slug}`} className="group">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </Link>

                <div className="flex gap-2">
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
      </div>

      {/* Bottom Featured Post (Full Width) */}
      <div className="mt-12 bg-base-100">
        {featuredPosts[4] && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-xl overflow-hidden ">
              <div className="lg:col-span-1 aspect-video lg:aspect-auto">
                <Link to={`/posts/${featuredPosts[4].slug}`}>
                  <img
                    src={featuredPosts[4].img}
                    alt="cover-image"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>

              <div className="lg:col-span-2 space-y-4 p-4 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Link to={`/users/${featuredPosts[4].user._id}`}>
                      <img
                        alt="Author avatar"
                        src={featuredPosts[4].user.img}
                        className="rounded-full w-10 h-10 "
                      />
                    </Link>
                    <Link
                      to={`/users/${featuredPosts[4].user._id}`}
                      className="font-semibold"
                    >
                      {featuredPosts[4].user.username}
                    </Link>
                  </div>
                  <span className="text-primary font-medium">
                    {formatDate(featuredPosts[4].createdAt)}
                  </span>
                </div>

                <div className="space-y-3">
                  <Link
                    to={`/posts/${featuredPosts[4].slug}`}
                    className="group"
                  >
                    <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                      {featuredPosts[4].title}
                    </h3>
                  </Link>
                  <p className="text-base text-gray-600">
                    {featuredPosts[4].desc}
                  </p>
                </div>

                <div className="flex gap-2">
                  {featuredPosts[4].category.map((category, index) => (
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
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedPosts;
