import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ReactGpt from "./ReactGPT.tsx";
export const RandomContext = createContext<string>("");
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RandomContext.Provider value="Anita lava la tina">
      <ReactGpt/>
    </RandomContext.Provider>
  </React.StrictMode>,
)
