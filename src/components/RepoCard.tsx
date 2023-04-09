import { useState } from "react";
import { useActions } from "../hooks/actions"
import { useAppSelector } from "../hooks/redux";
import { ReposItem } from "../utils/models"

const RepoCard = ({ repo }: { repo: ReposItem }) => {
  const { addFavorite, removeFavorite } = useActions();
  const { favorites } = useAppSelector(state => state.github);

  const [isFav, setIsFav] = useState(favorites.includes(repo.html_url));

  const addToFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addFavorite(repo.html_url);
    setIsFav(true);
  }

  const removeFromFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFavorite(repo.html_url);
    setIsFav(false);
  }

  return (
    <div className="mb-2 py-3 px-5 rounded hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="mr-2 font-bold">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">
          {repo?.description}
        </p>

        {!isFav && <button
          className="mt-2 py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
          onClick={addToFavorite}
        >
          Add to favorites
        </button>}

        {isFav && <button
          className="mt-2 py-2 px-4 bg-red-400 text-white rounded hover:shadow-md transition-all"
          onClick={removeFromFavorite}
        >
          Remove from favorites
        </button>}
      </a>
    </div>
  )
}

export default RepoCard