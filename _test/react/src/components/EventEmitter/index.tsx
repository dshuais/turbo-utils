import { useEffect } from 'react';
// import EventEmitter from '../../utils/EventEmitter';
import { EventEmitter } from 'turboutils';
// import { EventEmitter } from '../../../../../packages/trubo-utils'

export default function EventEmitterTest() {

  useEffect(() => {
    EventEmitter.on('test', (count) => {
      console.log('test', count)
    })

    EventEmitter.on('test2', test2)

    EventEmitter.once('test3', (count) => {
      console.log('test3', count)
    })

    EventEmitter.once('test4', (count) => {
      console.log('test4', count)
    })

    return () => {
      EventEmitter.removeListeners('test')
      EventEmitter.off('test2', test2)
    }
  }, []);

  function test2(count: number) {
    console.log('test2', count * 2);
    if(count === 4) {
      EventEmitter.off('test2', test2)
    }
  }

  return (
    <div>
      EventEmitter
    </div>
  )
}
