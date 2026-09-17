import { createContext, useCallback, useContext, useState } from 'react'
import PageLoader from '../components/ui/PageLoader.jsx'

const LoaderContext = createContext(null)

export function LoaderProvider({ children }) {
  const [loaderDone, setLoaderDone] = useState(false)

  const completeLoader = useCallback(() => setLoaderDone(true), [])

  return (
    <LoaderContext.Provider value={{ loaderDone, completeLoader }}>
      {children}
      <PageLoader onComplete={completeLoader} />
    </LoaderContext.Provider>
  )
}

export function useLoader() {
  return useContext(LoaderContext)
}