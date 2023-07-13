import { useState, createContext } from 'react'
import './App.scss'
import FixturesSmall from './components/FixturesSmall'
import Standings from './components/Standings'

interface EditorContext {
  displayMode: boolean
}

export const EditorContext = createContext<EditorContext>(null!)

function App() {

  const [displayMode, setDisplayMode] = useState(false)

  return (
    <>
      <EditorContext.Provider value={{displayMode}}>
        <FixturesSmall/>
        <Standings/>
      </EditorContext.Provider>
    </>
  )
}

export default App
