/*
 * @Author: dushuai
 * @Date: 2025-03-13 11:12:49
 * @LastEditors: dushuai
 * @LastEditTime: 2025-03-13 11:48:13
 * @description: 主要运用于服务端的工具函数
 */

/**
 * 转换字符串为驼峰格式
 * @param str - 输入字符串
 * @returns 驼峰格式字符串
 */
export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * 转换驼峰字符串为下划线格式
 * @param str - 输入驼峰字符串
 * @returns 下划线格式字符串
 */
export function toSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * 转换VO到DO
 * @param vo - Value Object
 * @param DoClass - Data Object类
 * @returns Data Object实例
 */
export function Vo2Do<T extends object, U extends object>(
  vo: T,
  DoClass: new () => U
): U {
  try {
    const doInstance = new DoClass();
    Object.keys(vo).forEach((key) => {
      const snakeCaseKey = toSnakeCase(key);
      if(snakeCaseKey in doInstance) {
        const value = (vo as any)[key];
        (doInstance as any)[snakeCaseKey] = value;
      }
    });
    return doInstance;
  } catch(error) {
    console.error('转换VO到DO时发生错误:>> ', error);
    throw error;
  }
}

/**
 * 转换DO到VO
 * @param doInstance - Data Object实例
 * @param VoClass - Value Object类
 * @returns Value Object实例
 */
export function Do2Vo<T extends object, U extends object>(
  doInstance: T,
  VoClass: new () => U
): U {
  try {
    const vo = new VoClass();
    Object.keys(doInstance).forEach((key) => {
      const camelCaseKey = toCamelCase(key);
      if(camelCaseKey in vo) {
        (vo as any)[camelCaseKey] = (doInstance as any)[key];
      }
    });
    return vo;
  } catch(error) {
    console.error('转换DO到VO时发生错误:>> ', error);
    throw error;
  }
}

/**
 * 将数组中的对象转换为驼峰命名
 * @param list
 * @returns
 */
export function list2CamelCase<U extends object, T extends object = any>(list: T[]): U[] {
  return list.map((item) => {
    return obj2CamelCase(item);
  });
}

/**
 * 将对象中的属性转换为驼峰命名
 * @param obj
 * @returns
 */
export function obj2CamelCase<U extends object, T extends object = any>(obj: T): U {
  const camelCaseObj: any = {};
  Object.keys(obj).forEach((key) => {
    camelCaseObj[toCamelCase(key)] = obj[key as keyof typeof obj];
  });
  return camelCaseObj;
}