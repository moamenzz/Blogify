import { Link } from "react-router-dom";

const PostCard = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 md:flex-row md:justify-normal md:items-start">
      <div>
        <div className="h-24 w-96">
          {/* Cover Image */}
          <Link to="/posts/post.page">
            <img
              src="/post-cover.png"
              alt="cover-image"
              className="object-cover"
            />
          </Link>
        </div>
        {/* Author Info & Created At Date */}
        <div className="flex flex-row gap-2 items-center pt-[4.3rem] ">
          <Link className="font-semibold text-md" to="/users/${user.id}">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="rounded-full w-9"
            />
          </Link>
          <div className="flex flex-row justify-between gap-20">
            <Link className="font-semibold text-md" to="/users/${user.id}">
              Mia Francisca
            </Link>
            <span className="text-[#6941C6] font-semibold text-md">
              Sunday , 1 Jan 2023
            </span>
          </div>
        </div>
        {/* Post Title */}
        <div className="flex flex-row justify-between items-center pt-4">
          <Link to="/posts/${post.page}">
            <h2 className="text-xl">UX Review Presentations</h2>
          </Link>
          <Link to="/posts/${post.page}">
            <i className="fas fa-arrow-trend-up"></i>
          </Link>
        </div>
        {/* Post Description */}
        <div className="pt-4">
          <Link to="/posts/${post.page}">
            <p className="text-sm font-normal max-w-sm">
              How do you create compelling presentations that wow your
              colleagues and impress your managers?
            </p>
          </Link>
        </div>
        {/* Post Categories */}
        <div className="flex flex-row space-x-4 pt-4">
          <Link className="badge badge-primary" to="/search/category=design">
            Design
          </Link>
          <Link className="badge badge-secondary" to="/search/category=ui/ux">
            UX/UI
          </Link>
          <Link className="badge badge-neutral" to="/search/category=team">
            Team
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
