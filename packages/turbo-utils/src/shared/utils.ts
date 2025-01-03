import { isEmpty } from '../';

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {T} source
 * @returns object
 */
export function deepClone<T>(source: T): T {
  if(!source && typeof source !== 'object') {
    throw new Error('error arguments deepClone');
  }
  const targetObj = (source!.constructor === Array ? [] : {}) as T;

  Object.keys(source!).forEach(keys => {
    type K = keyof typeof source;
    if(source![keys as K] && typeof source![keys as K] === 'object') {
      targetObj[keys as K] = deepClone(source![keys as K]);
    } else {
      targetObj[keys as K] = source![keys as K];
    }
  });

  return targetObj;
}

/**
 * Generate a unique id
 * @requires string
 */
export function uuid() {
  const s: (string | number)[] = [];
  const hexDigits = '0123456789abcdef';
  for(let i = 0; i < 36; i++) s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);

  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] as number & 0x3) | 0x8, 1);
  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
}

/**
 * Handle ios time formats
 * @param {string} date
 * @returns string
 */
export function iosDate(date: string) {
  return date.replace(/\-/g, '/');
}

/**
 * Copy object data
 * @param obj1 target
 * @param obj2 source data
 */
export function ObjectAssign<T extends object>(obj1: T, obj2: Partial<T> | any): T {
  if(isEmpty(obj1) || isEmpty(obj2)) return obj1;

  Object.keys(obj1).forEach(key => {
    (obj1 as any)[key] = obj2[key];
  });
  return obj1;
}

type QueryParams = { [key: string]: string | string[] };
/**
 * Convert query parameters to json
 * @param search query string
 * @param slice query separator
 * @returns object
 */
export function params2json(search: string, slice = '&'): QueryParams {
  if(isEmpty(search)) return {};
  const queryParams = decodeURIComponent(search).replace(/^\?/, '').split(slice);

  const params = queryParams.reduce((acc, param) => {
    const [key, value] = param.split('=');
    if(key) {
      const newValue = value ?? '';
      if(acc[key] && typeof acc[key] === 'string') {
        acc[key] = [acc[key], newValue];
      } else if(acc[key]) {
        (acc[key] as string[]).push(newValue);
      } else {
        acc[key] = newValue;
      }
    }
    return acc;
  }, {} as QueryParams);

  return params;
}

/**
 * Convert json to query parameters
 * @param params query parameters
 * @param slice query separator
 * @returns string
 */
export function json2params(params: QueryParams, slice = '&') {
  if(isEmpty(params)) return '';
  return Object.keys(params)
    .map(key => {
      const value = params[key];
      if(Array.isArray(value)) {
        return value.map(v => `${key}=${v}`).join(slice);
      }
      return `${key}=${value}`;
    })
    .join(slice);
}

/**
 * Gets the field inside the url
 * @param param field name
 * @param search You can specify the url, default window.location.search
 * @returns
 */
export function getUrlParam(param: string, search?: string) {
  const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)'),
    r = (search || window.location.search).substr(1).match(reg);
  if(r != null) return unescape(r[2]);
  return null;
}

/**
 * Filter empty values
 * @param obj object
 * @returns object
 */
export function filtrationEmpty(obj: QueryParams) {
  Object.keys(obj).forEach(key => {
    if(isEmpty(obj[key]) || obj[key] === 'undefined') {
      delete obj[key];
    }
  });
  return obj;
}

/**
 * Merge jump link
 * @param url url
 * @param params query parameters
 * @returns string
 */
export function padQuery(url: string, params: QueryParams = {}) {
  if(isEmpty(url)) return '';
  url = decodeURIComponent(url);

  const [pathname, search] = url.split('?'),
    query = filtrationEmpty(Object.assign({}, params2json(search), filtrationEmpty(Object.assign({}, params))));

  return `${pathname}?${json2params(query)}`;
}

/**
 * Get browser environment
 * @returns object
 */
export function browser() {
  const ua = navigator.userAgent.toLowerCase();
  const is = {
    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i),
    android: ua.indexOf('android') > -1 || ua.indexOf('linux') > -1,
    iPad: ua.indexOf('ipad') > -1,
    wechat: ua.toLowerCase().indexOf('micromessenger') > -1,
    aliPay: ua.toLowerCase().indexOf('alipay') > -1
  };

  return {
    ...is,
    isMobile: is.android || is.ios || is.iPad
  };
}

/**
 * Fill the short digit with 0
 * @param num number
 * @param len length
 * @returns 0**
 */
export function padZero(num: number | string, len = 2) {
  return num.toString().padStart(len, '0');
}

/**
 * Encryption character string, used by default to encrypt mobile phone numbers
 * @param str string
 * @param len length
 * @param symbol symbol
 * @param quantity * Quantity is valid only if len is number
 * @example encryptString('12345678901', [3, 8]) => 123****8901
 * @example encryptString('12345678901', 3, 4) => 123****
 * @returns string
 */
export function encryptString(str: string, len: number | number[] = [3, 7], symbol = '*', quantity?: number) {
  if(isEmpty(str)) return '';

  if(typeof len === 'number') {
    return str.slice(0, len) + symbol.repeat(quantity || (str.length - len));
  }

  const [start, end] = len;
  return str.slice(0, start) + symbol.repeat(str.length - end) + str.slice(end);
}

/**
 * Generate random string
 * @param len length
 * @returns string
 */
export function randomString(len: number = 32) {
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length;
  let n = '';
  for(let i = 0; i < len; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

type Many<T> = T | readonly T[];

/**
 * Creates an object composed of the picked `object` properties.
 * @param object The source object.
 * @param paths The property names to pick, specified individually or in arrays.
 * @returns Returns the new object.
 * @example
 * var object = { 'a': 1, 'b': 2, 'c': 3 };
 * pick(object, ['a', 'c']) => { 'a': 1, 'c': 3 }
 */
export function pick<T extends object, U extends keyof T>(
  object: T,
  ...props: Many<U>[]
): Pick<T, U> {
  type Result = { [K in U]?: T[K] };

  const result: Result = {},
    propsArray = props.reduce((acc, val) => {
      if(Array.isArray(val)) {
        return acc.concat(val);
      }
      return acc.concat([val]);
    }, [] as Many<U>[]);

  for(const prop of propsArray) {
    const key = prop as U;
    if(key in object) {
      result[key] = object[key];
    }
  }

  return result as Pick<T, U>;
}
