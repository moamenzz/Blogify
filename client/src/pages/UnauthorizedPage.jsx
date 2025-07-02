import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-md bg-base-300 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <h1 className="text-2xl font-bold text-red-500">
              Unauthorized Access
            </h1>
          </div>
          <p className="text-gray-600 mb-4">
            You don't have permission to view this content.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            It seems you don't have the required roles or permissions to access
            this page. If you believe this is an error, please contact your
            administrator.
          </p>
          <Link to="/">
            <button className="w-full bg-primary-content  text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
