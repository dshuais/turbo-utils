/*
 * @Author: dushuai
 * @Date: 2024-08-26 22:18:32
 * @LastEditors: dushuai
 * @LastEditTime: 2024-09-30 17:03:37
 * @description: header组件hooks
 */
import { useState } from 'react';
import { usePageScroll, setNavigationBarColor } from '@tarojs/taro';

type Props = {
  /** 默认文字color */
  color?: string;
  /** 上滑激活后的color */
  activedColor?: string;
  /** 默认 */
  background?: string;
  /** 上滑激活后的背景色 */
  activedBackground?: string;
  /** 滑动距离 触发变幻的高度 */
  top?: number;
};

/**
 * 头部组件hooks
 * @param props
 */
export default function useHeaderWarp(props?: Props) {

  const { color = '#fff', activedColor = '#000', background = 'transparent', activedBackground = '#fff', top = 20 } = props || {};

  const [state, setState] = useState({
    top: 0,
    color,
    background,
    finished: false
  });

  usePageScroll((res) => {
    const is = res.scrollTop > top;

    setState({
      top: res.scrollTop,
      color: is ? activedColor : color,
      background: is ? activedBackground : background,
      finished: is
    });

    setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: is ? activedBackground : background
    });

  });

  return {
    ...state
  };

}
