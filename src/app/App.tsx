import Router from "./Router/Router.tsx";
import '../shared/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
        },
    },
})

function App() {

  return (
      <QueryClientProvider client={queryClient}>
          <Router />
      </QueryClientProvider>
  )
}

export default App
