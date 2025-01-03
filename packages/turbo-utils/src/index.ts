export * from './shared/isEmpty';
export * from './shared/is';
export * from './shared/classNames';
export * from './shared/utils';
export * from './shared/validations';
import EventEmitterInstance from './EventEmitter';
import dayjs, { formatDate, getDateParams, getDateDiff } from './Dayjs';
const EventEmitter = EventEmitterInstance.getInstance();
export {
  EventEmitter,
  EventEmitterInstance,
  dayjs,
  formatDate,
  getDateParams,
  getDateDiff
};
