/*
 * @Author: dushuai
 * @Date: 2024-12-24 23:00:14
 * @LastEditors: dushuai
 * @LastEditTime: 2024-12-24 23:11:14
 * @description: EventEmitter
 */

type Args = any[];

type EventCallback = (...args: Args) => void;

/**
 * @description EventEmitter 发布-订阅模式
 *
 * 建议使用单例模式，避免多次实例化。直接导入 getInstance() 的 EventEmitter
 *
 * 如果需要多个实例，可以通过 turboutils/EventEmitter 导入 EventEmitter class 手动去new
 *
 * @example
 */
class EventEmitter {
  /** 事件列表 */
  private events: Record<string, Set<EventCallback>> = {};

  /** 实例 */
  private static instance: EventEmitter;

  // constructor() {}

  /** 获取实例 */
  static getInstance() {
    return EventEmitter.instance ??= new EventEmitter();
  }

  /**
   * 验证参数
   * @param eventName 事件名称
   * @param callback 事件回调
   * @param funcName 调用方法名称
   */
  private validArgs(eventName: string, callback: EventCallback, funcName: string): boolean {
    if(typeof eventName !== 'string') {
      console.error(`EventEmitter.${funcName}(): eventName must be a string`);
      return false;
    }

    if(typeof callback !== 'function') {
      console.error(`EventEmitter.${funcName}(): callback must be a function`);
      return false;
    }

    return true;
  }

  /**
   * 添加事件监听
   * @param eventName 事件名称
   * @param callback 事件回调
   */
  on(eventName: string, callback: EventCallback) {
    if(!this.validArgs(eventName, callback, 'on')) return;

    (this.events[eventName] ?? new Set()).add(callback);
  }

  /**
   * 触发事件监听
   * @param eventName 事件名称
   * @param args 参数
   */
  emit(eventName: string, ...args: Args) {
    if(!this.validArgs(eventName, () => {}, 'emit')) return;

    this.events[eventName]?.forEach(callback => callback(...args));
  }

  /**
   * 关闭事件监听
   * @param eventName 事件名称
   * @param callback 事件回调
   */
  off(eventName: string, callback: EventCallback) {
    if(!this.validArgs(eventName, callback, 'off')) return;

    this.events[eventName]?.delete(callback);
  }

  /**
   * 移除事件监听
   * @param eventName 事件名称
   */
  removeListeners(eventName: string | string[]) {
    if(!eventName) {
      console.error('EventEmitter.removeListeners(): eventName must be a string or an array of strings');
    }

    if(Array.isArray(eventName)) {
      eventName.forEach(name => this.events[name]?.clear());
      return;
    }

    if(typeof eventName === 'string') {
      this.events[eventName]?.clear();
      return;
    }
  }

  /**
   * 移除所有事件监听
   */
  removeAllListeners() {
    this.events = {};
  }

  /**
   * 添加一次性事件监听
   * @param eventName 事件名称
   * @param callback 事件回调
   */
  once(eventName: string, callback: EventCallback) {
    if(!this.validArgs(eventName, callback, 'once')) return;

    const onceCallback = (...args: Args) => {
      callback(...args);
      this.off(eventName, onceCallback);
    };
    this.on(eventName, onceCallback);
  }

  /**
   * 是否存在事件监听
   * @param eventName 事件名称
   * @param callback 事件回调
   * @returns 是否存在
   */
  has(eventName?: string, callback?: EventCallback) {
    if(eventName) {
      if(!callback) {
        return !!this.events[eventName];
      }
      return !!this.events[eventName]?.has(callback);
    }
    return false;
  }

}

export default EventEmitter;
