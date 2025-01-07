import Cookies from 'js-cookie';
export * from './validations/is';
export * from './validations/validations';
export * from './shared/utils';
export * from './shared/cookie';
import EventEmitterInstance from './EventEmitter';
import dayjs, { formatDate, getDateParams, getDateDiff } from './Dayjs';
import isEmpty from './validations/isEmpty';
import classNames from './shared/classNames';
import equals from './validations/equals';
const EventEmitter = EventEmitterInstance.getInstance();
export {
  EventEmitter,
  EventEmitterInstance,
  dayjs,
  formatDate,
  getDateParams,
  getDateDiff,
  isEmpty,
  classNames,
  equals,
  Cookies
};
