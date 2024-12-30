import dayjs from 'dayjs';

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

export default dayjs;
