import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-12 px-6 shadow-md bg-gray-600 text-white">
      <h3 className="font-bold">GitHub Search</h3>
      <span>
        <NavLink to="/" className="mr-4">Home</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </span>
    </nav>
  )
}

export default Navbar