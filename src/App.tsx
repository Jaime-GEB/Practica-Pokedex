import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';


const AppRouter = lazy(() => import('./router'));

function App() {
  return (
      <Suspense
        fallback={
          <div className="h-full w-full flex justify-center items-center background-white">
            <CircularProgress />
          </div>
        }
      >
        <AppRouter />
      </Suspense>
  )
}

export default App