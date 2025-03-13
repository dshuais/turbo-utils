/*
 * @Author: dushuai
 * @Date: 2025-01-05 11:48:21
 * @LastEditors: dushuai
 * @LastEditTime: 2025-03-13 09:43:30
 * @description: 一个用于检测滑动手势的自定义hook
 */
import { useSetState } from 'ahooks';
import { useEffect } from 'react';
const { isClient } = require('../../../../utils/utils');

type Props = {
  /** Y轴触发滚动距离 */
  thresholdY?: number;
  /** X轴触发滚动距离 */
  thresholdX?: number;
  screenWidth?: number;
  screenHeight?: number;
  /** 滑动结束回调 */
  onEnd?: (direction: DIRECTION) => void;
}

type STATE = {
  direction: DIRECTION | void;
  status: STATUS;
}

const screenWidth = isClient ? window?.innerWidth : 0,
  screenHeight = isClient ? window?.innerHeight : 0,
  baseWidth = 375,
  baseHeight = 667;

/**
 * 一个简单的用于检测滑动手势的自定义hook
 * @param props
 * thresholdX: 相对于375
 * thresholdY: 相对于667
 * @example
 * const { destroy, pause, resume } = useSwipeDetection({
    thresholdY: 150,
    thresholdX: 100,
    onEnd: (direction) => {
      console.log('direction:>> ', direction);
    }
  });
 */
function useSwipeDetection(props: Props) {

  const { thresholdY, thresholdX, onEnd } = props;

  const [state, setState] = useSetState<STATE>({
    direction: void 0,
    status: STATUS.DEFAULT
  });

  // thresholdX和thresholdY依据375*667计算 根据实际屏幕大小 把thresholdX和thresholdY转换成相对于屏幕的值
  const x = thresholdX ? (thresholdX / baseWidth) * (screenWidth || props.screenWidth || 0) : 0,
    y = thresholdY ? (thresholdY / baseHeight) * (screenHeight || props.screenHeight || 0) : 0;

  const { direction, status } = state;

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      destroy();
    };
  }, [status]);

  useEffect(() => {
    if(direction) onEnd && onEnd(direction);
  }, [direction]);

  const handleTouchStart = (e: TouchEvent) => {
    if(status !== STATUS.DEFAULT) return;

    const touch = e.touches[0];
    const touchStart = { x: touch.clientX, y: touch.clientY };

    e?.target?.addEventListener('touchmove', handleTouchMove);
    e?.target?.addEventListener('touchend', handleTouchEnd);

    function handleTouchMove(move: any) {
      const touchMove = move.touches[0];
      const touchEnd = { x: touchMove.clientX, y: touchMove.clientY };
      const deltaX = touchEnd.x - touchStart.x;
      const deltaY = touchEnd.y - touchStart.y;

      if(Math.abs(deltaX) > Math.abs(deltaY)) {
        if(x) {
          if(deltaX > x) setState({ direction: DIRECTION.RIGHT });
          else if(deltaX < -x) setState({ direction: DIRECTION.LEFT });
        }
      } else {
        if(y) {
          if(deltaY > y) setState({ direction: DIRECTION.DOWN });
          else if(deltaY < -y) setState({ direction: DIRECTION.UP });
        }
      }
    }

    function handleTouchEnd() {
      setState({ direction: void 0 });
      e?.target?.removeEventListener('touchmove', handleTouchMove);
      e?.target?.removeEventListener('touchend', handleTouchEnd);
    }
  };

  const destroy = () => {
    document.removeEventListener('touchstart', handleTouchStart);
    setState({ status: STATUS.DESTROY });
  };

  const pause = () => {
    setState({ status: STATUS.PUASE });
  };

  const resume = () => {
    if(status === STATUS.DESTROY) {
      document.addEventListener('touchstart', handleTouchStart);
    }

    setState({ status: STATUS.DEFAULT });
  };

  return {
    ...state,
    destroy,
    pause,
    resume
  };

}

export enum STATUS {
  DEFAULT = 'default',
  PUASE = 'puase',
  DESTROY = 'destroy'
}

export enum DIRECTION {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export default useSwipeDetection;
