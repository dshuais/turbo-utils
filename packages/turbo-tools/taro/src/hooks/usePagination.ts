/*
 * @Author: dushuai
 * @Date: 2024-09-28 19:35:17
 * @LastEditors: dushuai
 * @LastEditTime: 2024-09-30 21:44:46
 * @description: 分页hook
 */
import { useEffect, useMemo } from 'react';
import { useLatest, useSetState } from 'ahooks';
import { useReachBottom } from '@tarojs/taro';

type Props = {
  pageSize?: number
}

type State<T = any> = {
  status: STATUS
  list: T[]
  total: number
  pageNum: number
  pageSize: number
  /** 用于强制更新 */
  timestamp: number
}

/**
 * 一个整合状态、数据、total、分页参数的分页hook，在外部只需要配合pageNum, pageSize, timestamp调用fetch即可
 * @example 用法可参考 `@turbotools/taro-components` 组件库中 `ScrollListPage`、`ScrollList` 组件
 * const { pagination, fetchStatus, setPagination } = usePagination();
 * const { pageNum, pageSize, timestamp, list, statusText } = pagination;
 * @param {Props} props
 * @returns
 */
function usePagination<T>(props?: Props) {

  const { pageSize = 5 } = props || {};

  const [state, setState] = useSetState<State<T>>({
    status: STATUS.DEFAULT,
    list: [],
    total: 0,
    pageNum: 1,
    pageSize,
    timestamp: Date.now()
  });
  const paramsRef = useLatest(state);
  const { status, list, total, pageNum } = state;

  useReachBottom(() => {
    if(status === STATUS.DEFAULT && list.length < total) {
      setState({
        pageNum: pageNum + 1,
        status: STATUS.LOADING
      });
    }
  });

  useEffect(() => {
    setState({
      status: state.list.length >= state.total ? STATUS.FINISH : STATUS.DEFAULT
    });
  }, [state.list, state.total]);

  type Update = Pick<typeof state, keyof typeof state>

  function setPagination(data: { [P in keyof typeof state]?: any }) {
    setState(data as Update);
  }

  function incrPageNum() {
    if(status === STATUS.DEFAULT && list.length < total) {
      setState({
        pageNum: pageNum + 1,
        status: STATUS.LOADING
      });
    }
  }

  const getStatusText = useMemo(() => {
    return state.status === STATUS.FINISH ? '没有更多了~' : state.status === STATUS.LOADING ? '加载中...' : '下滑加载更多';
  }, [state.status]);

  return {
    pagination: {
      ...state,
      ...paramsRef.current,
      statusText: getStatusText
    },
    fetchStatus: state.status,
    setPagination,
    incrPageNum
  };
}

export enum STATUS {
  LOADING = 'loading',
  FINISH = 'finish',
  DEFAULT = 'default'
}

export default usePagination;
