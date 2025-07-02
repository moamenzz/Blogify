import { usePostStore } from "../../store/usePostStore.js";
import { Loader } from "lucide-react";

const Pagination = () => {
  const { totalPages, currentPage, fetchPosts, isLoading, posts } =
    usePostStore();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-8 gap-4">
      {/* Previous Button */}
      <button
        onClick={() => fetchPosts(currentPage - 1)}
        disabled={currentPage === 1 || !posts || posts.length === 0}
        className="btn btn-sm btn-primary"
      >
        <i className="fas fa-arrow-left"></i>
      </button>

      {/* Page Count */}
      <span className="text-lg">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next button */}
      <button
        onClick={() => fetchPosts(currentPage + 1)}
        disabled={currentPage === totalPages || !posts || posts.length === 0}
        className="btn btn-sm btn-primary"
      >
        <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
