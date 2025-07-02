import { Link, useParams } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { useEffect } from "react";
import { formatDate } from "../../lib/dateUtils.js";
import { Loader } from "lucide-react";

// const user = {
//   id: 1,
//   name: "Moamen",
//   createdAt: "2023-2-2",
//   profilePic: "/post-cover.png",
//   bio: "Full-stack Web developer || Pentester || Mechatronics student",
//   userPosts: [
//     {
//       id: 1,
//       title: "How collaboration makes us better designers",
//       description:
//         "Full-stack Web developer || Pentester || Mechatronics student",
//       author: "Mia Francisca",
//       date: "Sunday, 1 Jan 2023",
//       image: "/post-cover2.png",
//       categories: ["Design", "UI/UX", "Team"],
//     },
//     {
//       id: 1,
//       title: "How collaboration makes us better designers",
//       description:
//         "Full-stack Web developer || Pentester || Mechatronics student",
//       author: "Mia Francisca",
//       date: "Sunday, 1 Jan 2023",
//       image: "/post-cover2.png",
//       categories: ["Design", "UI/UX", "Team"],
//     },
//     {
//       id: 1,
//       title: "How collaboration makes us better designers",
//       description:
//         "Full-stack Web developer || Pentester || Mechatronics student",
//       author: "Mia Francisca",
//       date: "Sunday, 1 Jan 2023",
//       image: "/post-cover2.png",
//       categories: ["Design", "UI/UX", "Team"],
//     },
//   ],
// };

const UserProfilePage = () => {
  const { user, getProfile, createdPosts, getUserPosts, isLoading } =
    useUserStore();

  const { id } = useParams();
  useEffect(() => {
    getProfile(id);
    getUserPosts(id);
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  if (!user) return <div>User not found</div>;
  if (!createdPosts) return <div>User has no Posts</div>;

  return (
    <div className="py-10 mx-auto flex flex-col items-center max-w-[90rem] ">
      {/* User Info */}
      <div className="">
        {/* Profile Pic */}
        <img
          src={user?.img}
          alt="profile-pic"
          className="h-32 w-32 rounded-full object-cover"
        />
      </div>
      {/* Name & Bio*/}
      <div className="pt-6 text-center">
        <h1 className="text-2xl font-semibold">{user?.username}</h1>
        <p className="text-gray-600 text-lg ">{user?.bio}</p>
      </div>
      {/* Created At */}
      <span className="text-primary hover:text-primary/80 pt-4">
        Account Created At: {formatDate(user?.createdAt)}
      </span>
      {/* User Posts */}
      <div>
        {/* Header */}
        <div className="pt-10">
          <h1 className="text-lg font-semibold pb-6">User Posts:</h1>
        </div>
        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(createdPosts) &&
            createdPosts.map((post) => (
              <div key={post.id} className="flex flex-col space-y-4">
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
                  <div className="flex items-start">
                    {/* <div className="flex items-center gap-3 max-w-sm">
                    <Link to={`/users/${post.user._id}`}>
                      <img
                        alt="Author avatar"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        className="rounded-full w-10 h-10"
                      />
                    </Link>
                    <Link
                      to={`/users/${post.user._id}`}
                      className="font-semibold hover:text-primary transition-colors max-w-sm"
                    >
                      {post?.user?.username}
                    </Link>
                  </div> */}
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
              // ))}
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

//
