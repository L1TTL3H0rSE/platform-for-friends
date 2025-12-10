import { createTRPCNuxtClient } from 'trpc-nuxt/client'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@@/server/trpc'

export default defineNuxtPlugin(() => {
  const client = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
        async headers() {
          const headers = useRequestHeaders(['cookie'])
          return {
            ...headers,
          }
        },
      }),
    ],
  })

  return {
    provide: {
      trpc: client,
    },
  }
})