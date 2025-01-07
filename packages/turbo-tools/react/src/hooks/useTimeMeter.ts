/*
 * @Author: dushuai
 * @Date: 2024-09-28 11:48:21
 * @LastEditors: dushuai
 * @LastEditTime: 2025-01-04 10:44:03
 * @description: 一个倒计时hook
 */
import { useSetState, useCountDown } from 'ahooks';
import { useMemo } from 'react';
import { dayjs, padZero } from 'turboutils';

/**
 * 倒计时hook
 *
 * 此hook内部基于ahooks的useCountDown实现 使用时需确保已安装ahooks
 *
 * @example const { timing, changeTiming, pauseTiming, resumeTiming, resetTiming } = useTimeMeter();
 *
 * changeTiming(60 * 60); // 此为设置一小时倒计时 单位为秒
 * @param {Props} props
 * @returns
 */
export default function useTimeMeter(props: Props = {}) {

  const { onEnd } = props;

  const [state, setState] = useSetState({
    targetDate: 0 as number | undefined,
    pause: false,
    remainder: 0 // 暂停后记录剩余时间
  });

  const { targetDate, pause, remainder } = state;

  const [countdown, formattedRes] = useCountDown({
    targetDate,
    onEnd: () => {
      onEnd && onEnd();
    }
  });

  /** 剩余m */
  const timing = useMemo(() => {
    return pause ? remainder : Math.round(countdown / 1000);
  }, [countdown, pause, remainder]);

  /**
   * 设置倒计时时间
   * @param value 单位s
   */
  const changeTiming = (value?: number) => {
    const time = value ? dayjs().add(value, 'second').valueOf() : undefined;
    setState({ targetDate: time, pause: false });
  };

  /**
   * 暂停倒计时
   */
  const pauseTiming = () => {
    if(countdown) {
      setState({ pause: true, remainder: Math.round(countdown / 1000), targetDate: undefined });
    }
  };

  /**
   * 恢复倒计时
   */
  const resumeTiming = () => {
    if(pause) {
      changeTiming(remainder);
    }
  };

  /**
   * 格式化倒计时
   * @param reset 格式化格式 将基于格式化格式返回对应时间 default: { fmt: 'dhms', d: '天', h: ':', m: ':', s: '' }
   * @returns string
   */
  const resetTiming = (resetProps: ResetProps) => {
    const { days, hours, minutes, seconds } = formattedRes,
      { fmt = 'dhms', d = '天', h = ':', m = ':', s = '' } = resetProps,
      format = (f: string) => fmt?.includes(f) || false;

    return `${format('d') ? `${days}${d}` : ''}${format('h') ? `${hours}${h}` : ''}${format('m') ? `${padZero(minutes)}${m}` : ''}${format('s') ? `${padZero(seconds)}${s}` : ''}`;
  };

  return {
    /** 剩余m */
    timing,
    formattedRes,
    /** 倒计时状态 */
    pause,
    /**
     * 格式化时间
     * @example formTime('h') => 0:00:00
     */
    formTime: resetTiming({ fmt: 'hms' }),
    /**
     * 格式化全部时间
     * @example formTimeAll('d') => 1天0时00分00秒
     */
    formTimeAll: resetTiming({ h: '时', m: '分', s: '秒' }),
    changeTiming,
    pauseTiming,
    resumeTiming,
    /** 格式化倒计时 */
    resetTiming
  };
}

type Props = {
  onEnd?: () => void;
}

type ResetProps = {
  /** 需要返回的格式 默认dhms d天 h时 m分 s秒 */
  fmt?: string;
  /** 格式化后的分割 默认天 */
  d?: string;
  /** 格式化后的分割 默认: */
  h?: string;
  /** 格式化后的分割 默认: */
  m?: string;
  /** 格式化后的分割 默认空 */
  s?: string;
}
