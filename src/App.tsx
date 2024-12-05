import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useStore } from './store/useStore'

function App(): JSX.Element {
  const { count, increment, decrement, reset } = useStore()

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-4 mb-8">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="h-24 hover:scale-110 transition-transform" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="h-24 animate-spin-slow hover:animate-none" alt="React logo" />
          </a>
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Vite + React + TS
        </h1>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={decrement}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Decrease
            </button>
            <button
              onClick={increment}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Increase
            </button>
          </div>
          <div className="text-center text-2xl font-bold mb-4">
            Count: {count}
          </div>
          <button
            onClick={reset}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Reset
          </button>
          <p className="mt-4 text-gray-600 text-center">
            Edit <code className="bg-gray-100 px-2 py-1 rounded">src/store/useStore.ts</code> to change store logic
          </p>
        </div>
        <p className="text-center text-gray-500 mt-8">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App 