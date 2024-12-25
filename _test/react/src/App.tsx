import { useEffect, useState } from 'react'
// import EventEmitter from '../../../packages/trubo-utils/lib/EventEmitter'

import {EventEmitter} from 'turboutils'

import EventEmitterTest from './components/EventEmitter'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

function App() {
  const [count, setCount] = useState(0);

  function onAdd() {
    setCount((count) => count + 1);
    EventEmitter.emit('test', count + 1);
    EventEmitter.emit('test2', count + 1);
    console.log('has test event listener', EventEmitter.has('test'));
    if(count + 1 === 10) {
      EventEmitter.removeAllListeners();
    }
  }

  useEffect(() => {
    console.log('EventEmitter:>> ', EventEmitter);
    
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onAdd}>
          count is {count}
        </button>
      </div>
      <div>
        EventEmitter:
        <EventEmitterTest />
      </div>
    </>
  )
}

export default App
