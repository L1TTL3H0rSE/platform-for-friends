import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@@/server/trpc'

export default defineEventHandler((event) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: toWebRequest(event), 
    router: appRouter,
    createContext: () => ({}),
  })
})