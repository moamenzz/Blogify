import { Link, useNavigate } from "react-router-dom";
import useThemeStore from "../../store/useThemeStore";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = () => {
  const { theme, setTheme } = useThemeStore();
  const { logout, isAuthenticated, setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleThemeChange = (e) => {
    // Wenn checkbox checked ist, setze dark theme, sonst light
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleLogout = async () => {
    await logout(navigate);
    setIsAuthenticated(false);
  };

  return (
    // <div className="flex flex-row justify-between items-center mx-auto px-4 py-4 md:px-8 lg:px-12 xl:px-16 ">
    //   {/* Logo */}
    //   <div className="text-[#1A1A1A] text-lg items-center">
    //     <Link to="/">Blogify</Link>
    //   </div>
    //   {/* List Items */}
    //   <div>
    //     {/* Hamburger button */}
    //     <div className="flex md:hidden text-[#1A1A1A] text-lg items-center">
    //       <i className="fas fa-bars cursor-pointer"></i>
    //     </div>
    //     <div className="hidden md:flex text-[#1A1A1A] text-lg items-center space-x-6">
    //       <Link to="/register">Register</Link>
    //       <Link to="/login">Log In</Link>
    //       {authenticated && <Link to="/about">Create Post</Link>}
    //       <Link to="#">Newsletter</Link>
    //       <button className="text-black px-2 font-semibold text-lg items-center">
    //         <i className="fas fa-moon"></i>
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="navbar bg-base-100 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            {!isAuthenticated ? (
              <div>
                {" "}
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </div>
            ) : (
              <li>
                <Link to="/create-post">Create Post </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link className="btn btn-ghost text-xl" to="/">
          Blogify
        </Link>
      </div>
      <div className="navbar-end space-x-3">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        {/* <button className="btn btn-ghost btn-circle ">
          <i className="fas fa-moon text-black font-semibold text-lg items-center"></i>
        </button> */}
        <label className="grid cursor-pointer place-items-center">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={handleThemeChange}
            className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1 "
          />
          <svg
            className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <svg
            className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
        {isAuthenticated ? (
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
