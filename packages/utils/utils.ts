/*
 * @Author: dushuai
 * @Date: 2025-03-13 09:38:24
 * @LastEditors: dushuai
 * @LastEditTime: 2025-03-13 09:38:39
 * @description: 心平气和
 */

/** 判断当前是否是服务端环境 */
export const isSSR = typeof window === 'undefined';

/** 判断当前是否是客户端环境 */
export const isClient = typeof window !== 'undefined';
