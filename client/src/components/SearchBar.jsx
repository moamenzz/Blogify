import { useEffect, useState } from "react";
import { usePostStore } from "../../store/usePostStore.js";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const { searchPosts, posts, isLoading } = usePostStore();

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      searchPosts(query, category, 1);
    }, 300);

    return () => {
      clearTimeout(delayBounce);
    };
  }, [query, category]);

  return (
    <div>
      <div className="flex items-center max-w-lg mx-auto py-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="input input-bordered w-full pl-10"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input input-bordered w-32 "
        >
          <option value="">All Categories</option>
          <option value="General">General</option>
          <option value="Team">Team</option>
          <option value="UI/UX">UI/UX</option>
          <option value="AI">AI</option>
          <option value="Interface">Interface</option>
          <option value="Software-Development">Software Development</option>
        </select>
      </div>

      {!posts ||
        (posts.length === 0 && (
          <div>
            <div className="text-center text-lg font-semibold py-16 text-gray-600">
              Post not found...
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchBar;
