/*
 * @Author: dushuai
 * @Date: 2025-01-21 16:44:27
 * @LastEditors: dushuai
 * @LastEditTime: 2025-03-13 11:17:31
 * @description: turbo-utils
 */
import Cookies from 'js-cookie';
export * from './validations/is';
export * from './validations/validations';
export * from './shared/utils';
export * from './shared/cookie';
export * from './shared/server';
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
