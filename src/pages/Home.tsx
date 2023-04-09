import { useState, useEffect } from "react";
import { useSearchUsersQuery } from "../store/github/github.api"
import { useDebounce } from "../hooks/useDebounce";

const Home = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const debounced = useDebounce(searchInput);
  const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  });

  useEffect(() => {
    setIsDropdownVisible(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data])

  return (
    <div className="flex justify-center items-center pt-10 h-full w-full">
      {isError && <p className="text-center text-red-500">Something went wrong...</p>}
      <div className="relative w-96">
        <input
          type="text"
          className="border w-full h-10 mb-2 py-2 px-4"
          placeholder="Search for GitHub username..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        {isDropdownVisible && <ul className="absolute top-10 left-0 right-0 max-h-52 shadow-md overflow-y-scroll">
          {isLoading && <p className="text-center text-gray-700">Loading...</p>}
          {data?.map(user => (
            <li
              key={user.id}
              className="py-2 px-4 hover:bg-gray-600 hover:text-white transition-colors cursor-pointer"
            >
              {user.login}
            </li>
          ))}
        </ul>}
      </div>
    </div>
  )
}

export default Home