import EventEmitterInstance from './EventEmitter';
import dayjs, { formatDate } from './Dayjs';

const EventEmitter = EventEmitterInstance.getInstance();

export {
  EventEmitter,
  EventEmitterInstance,
  dayjs,
  formatDate
};
