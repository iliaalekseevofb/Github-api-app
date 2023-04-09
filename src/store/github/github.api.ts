import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ServerResponse, UserItem } from '../../utils/models'

export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/'
  }),
  endpoints: build => ({
    searchUsers: build.query<UserItem[], string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 10
        }
      }),
      transformResponse: (response: ServerResponse<UserItem>) => response.items
    }),
  })
})

export const {useSearchUsersQuery} = githubApi