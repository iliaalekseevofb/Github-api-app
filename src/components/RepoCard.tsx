import { ReposItem } from "../utils/models"

const RepoCard = ({ repo }: { repo: ReposItem }) => {
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
      </a>
    </div>
  )
}

export default RepoCard