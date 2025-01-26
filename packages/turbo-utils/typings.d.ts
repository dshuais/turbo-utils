/*
 * @Author: dushuai
 * @Date: 2023-12-31 09:33:25
 * @LastEditors: dushuai
 * @LastEditTime: 2025-01-26 12:21:59
 * @description: ts类型文件
 */

export type Rules<T extends Empty<string>> = { valid?: boolean; key: keyof T; msg: string; };

export type Empty<K extends string | number | symbol = string, T = any> = Partial<Record<K, T>>;
