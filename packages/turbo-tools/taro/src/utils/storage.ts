import Taro from '@tarojs/taro';

export const getStorage = (key: string) => {
  return Taro.getStorageSync(key);
};

export const setStorage = (key: string, value: any) => {
  return Taro.setStorageSync(key, value);
};

export const removeStorage = (key: string) => {
  return Taro.removeStorageSync(key);
};

export const clearStorage = () => {
  return Taro.clearStorageSync();
};
