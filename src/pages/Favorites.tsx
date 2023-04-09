import { useAppSelector } from "../hooks/redux"

const Favorites = () => {
  const { favorites } = useAppSelector(state => state.github);

  if (favorites.length === 0) return <p className="text-center">No items</p>

  return (
    <div className="flex justify-center items-center pt-10 h-full w-full">
      <ul className="list-none">
        { favorites.map((favoriteItem) => (
          <li key={favoriteItem}>
            <a href={favoriteItem} target="_blank">
              {favoriteItem}
            </a>
          </li>
        )) }
      </ul>
    </div>
  )
}

export default Favorites