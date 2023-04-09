import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserSearchResponse, UserItem, ReposItem } from '../../utils/models'

export const githubApi = createApi({
  reducerPath: 'github/api',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/'
  }),
  endpoints: build => ({
    // Query for searching users by name
    searchUsers: build.query<UserItem[], string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 10
        }
      }),
      transformResponse: (response: UserSearchResponse) => response.items
    }),

    // Query for getting repositories of the user by name
    getUserRepos: build.query<ReposItem[], string>({
      query: (userName: string) => ({
        url: `users/${userName}/repos`
      })
    })
  })
})

export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi