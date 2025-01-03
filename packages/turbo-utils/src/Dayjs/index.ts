import dayjs from 'dayjs';
import { padZero } from '../shared/utils';

/**
 * 格式化时间 Date 转化为指定格式的String
 * 年(y)可以用 1-4 个占位符、月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、毫秒(S)只能用 1 个占位符(是 1-3 位的数字)、周(E)、季度(q)可以用 1-2 个占位符
 * @param {string | number | Date} [date] 时间 可选，默认为当前时间
 * @param {string} [fmt] 格式 可选，默认为 yyyy-MM-dd HH:mm:ss
 * @returns 时间date as fmt
 *
 * formatDate('2023-03-23 15:30:59:60', 'yyyy-MM-dd HH:mm:ss:S EEE qq')
 *
 * => 2023-03-23 15:30:59:60 星期四 01
*/
export function formatDate(date?: string | number | Date, fmt?: string) {
  const day: dayjs.Dayjs = dayjs(date);
  if(fmt === void 0) fmt = 'yyyy-MM-dd HH:mm:ss';
  const o = {
    'M+': day.month() + 1, // 月份
    'd+': day.date(), // 日
    'h+': day.hour() % 12 === 0 ? 12 : day.hour() % 12, // 小时
    'H+': day.hour(), // 小时
    'm+': day.minute(), // 分
    's+': day.second(), // 秒
    'q+': Math.floor((day.month() + 3) / 3), // 季度
    'S': day.millisecond() // 毫秒
  };
  const week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  };
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (day.year() + '').substr(4 - RegExp.$1.length)
    );
  }
  if(/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? '\u661f\u671f'
          : '\u5468'
        : '') + week[day.day() + '' as keyof typeof week]
    );
  }
  for(const k in o) {
    if(new RegExp('(' + k + ')').test(fmt)) {
      type O = keyof typeof o

      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k as O] as unknown as string
          : ('00' + o[k as O]).substr(('' + o[k as O]).length)
      );
    }
  }
  return fmt;
}

/**
 * Get time parameter
 * @param date
 * @returns
 */
export function getDateParams(date?: string | number | Date) {
  const day = dayjs(date);
  const weekDay = { 0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六' };
  const dateParams = {
    'y': day.year() + '',
    'm': day.month() + 1 + '',
    'd': day.date() + '',
    'h': day.hour() + '',
    'mm': day.minute() + '',
    'ss': day.second() + '',
    'w': weekDay[day.day()]
  };
  type Key = keyof typeof dateParams
  for(const key in dateParams) {
    if(Object.hasOwnProperty.call(dateParams, key) && !['y', 'w'].includes(key)) {
      dateParams[key as Key] = padZero(dateParams[key as Key]);
    }
  }
  return dateParams;
}

type TimeUnit = { label: string; value: number };

/**
 * Get the difference between the current time and the specified time
 * @param dateTimeStamp string | number | Date
 * @returns string
 */
export function getDateDiff(dateTimeStamp: string | number | Date): string {
  const timestamp = dayjs(dateTimeStamp).valueOf(),
    now = dayjs().valueOf(),
    diffValue = now - timestamp;

  if(diffValue < 0) return '未来的时间';

  const units: TimeUnit[] = [
    { label: '年', value: 365 * 24 * 60 * 60 * 1000 },
    { label: '月', value: 30 * 24 * 60 * 60 * 1000 },
    { label: '周', value: 7 * 24 * 60 * 60 * 1000 },
    { label: '天', value: 24 * 60 * 60 * 1000 },
    { label: '小时', value: 60 * 60 * 1000 },
    { label: '分钟', value: 60 * 1000 },
    { label: '刚刚', value: 10 * 1000 }
  ];

  if(diffValue < units[units.length - 1].value) return '刚刚';

  for(const { label, value } of units.slice(0, -1)) {
    const unitDiff = diffValue / value;
    if(unitDiff >= 1) {
      if(label === '天' && unitDiff < 2) {
        return unitDiff === 1 ? '昨天' : '今天';
      }
      return `${Math.floor(unitDiff)} ${label}前`;
    }
  }
  return '刚刚';
}

export default dayjs;
