import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <AlertTriangle className="text-yellow-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl mt-2 text-gray-600">Oops! Page not found.</p>
        <p className="text-gray-500 mt-1">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Go back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
