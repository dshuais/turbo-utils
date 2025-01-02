/*
 * @Author: dushuai
 * @Date: 2023-12-31 09:33:25
 * @LastEditors: dushuai
 * @LastEditTime: 2023-12-31 10:24:31
 * @description: ts类型文件
 */

type Rules = { valid?: boolean; key: string; msg: string; };

type Empty<K, T> = Partial<{ [key: K]: T; }>;
