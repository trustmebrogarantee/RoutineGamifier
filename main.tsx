import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@site:app/App.tsx'
// import { startWebGLApplication } from '@game/index'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const urlParams = new URLSearchParams(window.location.search);
const webgl = urlParams.get('webgl');
if (webgl) {
  document.getElementById('root')!.style.display = 'none'
  document.getElementById('game-wrapper')!.style.display = 'block'
  const { startWebGLApplication } = (await import('@game/index'))
  startWebGLApplication()
}