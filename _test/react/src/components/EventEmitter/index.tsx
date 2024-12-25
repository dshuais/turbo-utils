import { useEffect } from 'react';
import { EventEmitter } from 'turboutils';

export default function EventEmitterComp() {

  useEffect(() => {
    EventEmitter('q')
  }, []);

  return (
    <div>
      EventEmitter
    </div>
  )
}
