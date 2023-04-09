import { useState, useEffect } from "react";
import { useSearchUsersQuery, useLazyGetUserReposQuery } from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const Home = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const debounced = useDebounce(searchInput);
  const {
    isLoading: isUsersLoading,
    isError: isUsersError,
    data: usersData
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  });

  const [fetchRepos, {
    isLoading: isReposLoading,
    isError: isReposError,
    data: reposData
  }] = useLazyGetUserReposQuery()

  useEffect(() => {
    setIsDropdownVisible(debounced.length > 3 && usersData?.length! > 0);
  }, [debounced, usersData])

  const onUserClickHandler = (userName: string) => {
    fetchRepos(userName);
    setIsDropdownVisible(false);
  }

  return (
    <div className="flex justify-center items-center pt-10 h-full w-full">
      {isUsersError && <p className="text-center text-red-500">Something went wrong...</p>}
      <div className="relative w-96">
        <input
          type="text"
          className="border w-full h-10 mb-2 py-2 px-4"
          placeholder="Search for GitHub username..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        {isDropdownVisible && <ul className="absolute top-10 left-0 right-0 max-h-52 shadow-md overflow-y-scroll">
          {isUsersLoading && <p className="text-center text-gray-700">Users are loading...</p>}
          {usersData?.map(user => (
            <li
              key={user.id}
              onClick={() => onUserClickHandler(user.login)}
              className="py-2 px-4 hover:bg-gray-600 hover:text-white transition-colors cursor-pointer"
            >
              {user.login}
            </li>
          ))}
        </ul>}

        <div className="container">
          {isReposLoading && <p className="text-center">Repos are loading...</p>}
          {reposData?.map(repo => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home