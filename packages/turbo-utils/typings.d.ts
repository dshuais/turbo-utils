/*
 * @Author: dushuai
 * @Date: 2023-12-31 09:33:25
 * @LastEditors: dushuai
 * @LastEditTime: 2025-01-26 12:23:50
 * @description: ts类型文件
 */

export type Rules<T = Empty<string>> = { valid?: boolean; key: keyof T; msg: string; };

export type Empty<K extends string | number | symbol = string, T = any> = Partial<Record<K, T>>;
