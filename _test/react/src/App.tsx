import { useEffect, useState } from 'react'
// import { formatDate, dayjs } from '../../../packages/turbo-utils'

// import { EventEmitter } from 'turboutils'
// import { dayjs, formatDate } from 'turboutils';

import EventEmitterTest from './components/EventEmitter'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

function App() {
  const [count, setCount] = useState(0);

  function onAdd() {
    setCount((count) => count + 1);
    // EventEmitter.emit('test', count + 1);
    // EventEmitter.emit('test2', count + 1);
    // console.log('has test event listener', EventEmitter.has('test'));
    // if(count + 1 === 10) {
    //   EventEmitter.removeAllListeners();
    // }
  }

  useEffect(() => {
    // console.log('EventEmitter:>> ', EventEmitter);

    // const day: dayjs.Dayjs = dayjs();
    // console.log('formatDate:>> ', formatDate(1735551221117, 'MM/dd EE'));
    // console.log('dayjs:>> ', day.isAfter('2022-12-31'), day.format('YYYY-MM-DD HH:mm:ss'), ' --  ', day.add(2, 'day').format('YYYY-MM-DD HH:mm:ss'));
    
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
