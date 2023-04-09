import { useSearchUsersQuery } from "../store/github/github.api"

const Home = () => {
  const {isLoading, isError, data} = useSearchUsersQuery('Ilia');

  console.log(data);

  return (
    <div>Home</div>
  )
}

export default Home