import { isString } from './is';

export const regs = {
  url: "^(http|https|ftp)://[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9-._?,'/\\+&amp;%$#=~])*[^.,)(s]$",
  email: '^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$',
  mobile: /^1[^12][0-9]{9}$/,
  tel: '^0\\d{2,3}-?\\d{7,8}$', // 固话
  idCard: /^\d{15}(\d{2}[A-Za-z0-9])?$/,
  card: /^\d{13,19}$/, // 银行卡
  passport: /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/,  // 护照（包括香港和澳门）
  currency: '^\\d+(\\.\\d+)?$',
  qq: '^[1-9]d{4,8}$',
  number: '^[0-9]*$',
  positiveInt: '^[1-9]d*$',
  zip: '^[1-9]d{5}$',
  double: '^[-+]?d+(.d+)?$',
  english: '^[A-Za-z]+$',
  chinese: '^[\u0391-\uFFE5]+$',
  unSafe: '^(.{0,5})$|s',
  date: '(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)',
  name: /^[\u4e00-\u9fa5\ a-zA-Z]+$/
};

function validation(reg: keyof typeof regs) {
  return (value: unknown) => {
    if(isString(value)) {
      const regExp = new RegExp(regs[reg]);
      return regExp.test(value);
    }
    return false;
  };
}

/**
 * form表单校验规则
 * @param rules 规则
 * @param data 已填写的数据
 * @returns valid 是否通过校验，msg 错误信息
 */
export function validate<T extends { [key in string]: any }>(rules: Rules[], data: T) {
  const result: Rules[] = [];
  const some = rules.some(r => {
    const v = data[r.key], vv = !v && v !== 0;
    if(vv) result.push(r);
    return vv;
  });

  if(!some) return { valid: false, ...result[0] };

  return { valid: true };
}

/** 金额校验 */
export const isCurrency = (value: unknown) => {
  return validation('currency')(value);
};

/** URL验证 */
export const isUrl = (value: unknown) => {
  return validation('url')(value);
};

/** 邮箱验证 */
export const isEmail = (value: unknown) => {
  return validation('email')(value);
};

/** 手机号码验证 */
export const isMobile = (value: unknown) => {
  return validation('mobile')(value);
};

/** 正整数验证 */
export const isNumberValid = (value: unknown) => {
  return validation('number')(value);
};

/** 身份证验证 */
export const isIdCard = (value: unknown) => {
  return validation('idCard')(value);
};

/** 银行卡号验证 */
export const isCard = (value: unknown) => {
  return validation('card')(value);
};

/** 护照验证 */
export const isPassport = (value: unknown) => {
  return validation('passport')(value);
};

/** 验证必填（可验证数组） */
export const requiredValid = (value: string | any[]) => {
  if(typeof value === 'undefined') {
    return false;
  } else if(typeof value === 'string') {
    return !!trim(value);
  } else if(Array.isArray(value)) {
    if(value.length === 0) {
      return false;
    }
    for(const item of value) {
      if(typeof item !== 'number' && !trim(item)) {
        return false;
      }
    }
  }
  return true;
};

/** 验证最大长度 */
export const maxLengthValid = (value: string | any[], maxLength: number) => {
  let length = 0;
  if(typeof value === 'number') {
    length = String(value).length;
  } else if(value instanceof Array || typeof value === 'string') {
    length = value.length;
  }
  return maxLength > 0 && length <= maxLength;
};

/** 验证最小长度 */
export const minLengthValid = (value: string | any[], minLength: number) => {
  let length = 0;
  if(typeof value === 'number') {
    length = String(value).length;
  } else if(value instanceof Array || typeof value === 'string') {
    length = value.length;
  }
  return minLength > 0 && length >= minLength;
};

const trim = (str: string | null) => {
  return str === null ? '' : String.prototype.trim.call(str);
};