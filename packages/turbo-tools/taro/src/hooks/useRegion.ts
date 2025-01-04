import { useEffect } from 'react';
import Taro from '@tarojs/taro';
import { useSetState } from 'ahooks';
import { getLocation } from '..';

type Props = {
  key: string;
  manual?: boolean;
  fail?: (err: any) => void;
}

type STATE = {
  longitude: number;
  latitude: number;
  /** 当前坐标位置 */
  address: any;
  /** 腾讯map解析后all数据 */
  result: any;
}

/**
 * 获取地区信息 该hook使用腾讯地图api
 * @returns
 */
export default function useRegion(props: Props) {

  const { manual = false, key, fail } = props || {};

  const [state, setState] = useSetState<STATE>({
    longitude: 0,
    latitude: 0,
    address: {},
    result: {}
  });

  /**
   * 获取地区信息
   * @param failTips 当拒绝定位时是否弹出弹窗
   * @param force 是否强制获取地址信息
   */
  async function getRegion(failTips = false, force = false) {

    if(state.address.city && !failTips) return;

    try {
      const data = await getLocation({ needFullAccuracy: true, isHighAccuracy: true }, failTips);
      const { longitude, latitude } = data;
      setState({ longitude, latitude });

      if(!manual || force) {
        Taro.request({
          url: getMapApi({ longitude, latitude, key }),
          header: {
            'Content-Type': 'application/json'
          },
          data: {},
          method: 'GET',
          success: (res) => {
            if(res.statusCode === 200 && res.data.status === 0) {
              // 从返回值中提取需要的业务地理信息数据 国家、省、市、县区、街
              setState({
                address: res.data.result.address_component,
                result: res.data.result
              });
            }
          },
          fail: (error) => {
            fail && fail(error);
          }
        });
      }

    } catch(error) {
      console.error('getRegion error:>> ', error);
      fail && fail(error);
    }
  }

  useEffect(() => {
    getRegion();
  }, []);

  return {
    ...state,
    getRegion
  };
}

/**
 * 获取腾讯地图api
 * @param params
 * @returns
 */
export function getMapApi({ longitude, latitude, key }: { longitude: number, latitude: number, key: string }) {
  return `https://apis.map.qq.com/ws/geocoder/v1?location=${latitude},${longitude}&key=${key}&get_poi=1`;
}

