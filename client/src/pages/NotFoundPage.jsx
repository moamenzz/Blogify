import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 ">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-500 dark:text-gray-500 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="px-6 py-3 text-lg bg-primary-content">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
