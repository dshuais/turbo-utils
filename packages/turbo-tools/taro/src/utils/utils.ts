import Taro, { NodesRef } from '@tarojs/taro';

/** 获取系统信息 */
export function getSystemInfo() {
  const device = Taro.getDeviceInfo();
  const window = Taro.getWindowInfo();
  const systemInfo = {
    ...device,
    ...window
  };

  // 导航栏高度
  let rect: any = null; //胶囊按钮位置信息
  try {
    rect = Taro.getMenuButtonBoundingClientRect
      ? Taro.getMenuButtonBoundingClientRect()
      : null;
    if(rect === null) {
      throw 'getMenuButtonBoundingClientRect error';
    }
    //取值为0的情况
    if(!rect.width) {
      throw 'getMenuButtonBoundingClientRect error';
    }
  } catch(error) {
    let gap = 0; // 胶囊按钮上下间距 使导航内容居中
    let width = 96; // 胶囊的宽度，android大部分96，ios为88
    if(systemInfo.platform === 'android') {
      gap = 8;
      width = 96;
    } else if(systemInfo.platform === 'devtools') {
      if(`${systemInfo.system}`.toLowerCase().includes('ios')) {
        gap = 5.5; // 开发工具中ios手机
      } else {
        gap = 7.5; // 开发工具中android和其他手机
      }
    } else {
      gap = 4;
      width = 88;
    }
    if(!systemInfo.statusBarHeight) {
      // 开启wifi的情况下修复statusBarHeight值获取不到
      systemInfo.statusBarHeight =
        systemInfo.screenHeight - systemInfo.windowHeight - 20;
    }
    rect = {
      // 获取不到胶囊信息就自定义重置一个
      bottom: systemInfo.statusBarHeight + gap + 32,
      height: 32,
      left: systemInfo.windowWidth - width - 10,
      right: systemInfo.windowWidth - 10,
      top: systemInfo.statusBarHeight + gap,
      width: width
    };
  }
  const gap = rect.top - systemInfo.statusBarHeight!; // 动态计算每台手机状态栏到胶囊按钮间距
  const navBarHeight = 2 * gap + rect.height;
  const safeTopDistance = rect.bottom;
  const systemText = `${systemInfo.system}`.toLowerCase();
  return {
    ...systemInfo,
    navBarHeight,
    safeTopDistance,
    headerHeight: systemInfo.statusBarHeight + navBarHeight,
    isIOS: systemText.includes('ios') || systemText.includes('mac'),
    rect
  };
}

/**
 * 定义全局对象属性
 * @param key  属性名
 * @param value  属性值
 * @param writable 是否可写
 */
export function defineAppProperty(
  key: PropertyKey,
  value: any,
  writable = false
) {
  if(key in Taro.getApp() && !writable) return;
  return Object.defineProperty(Taro.getApp(), key, {
    writable,
    value
  });
}

/**
 * 获取当前元素实例
 * @param selector 选择器
 * @returns
 */
export const selectorQueryClientRect = (selector: string): Promise<NodesRef.BoundingClientRectCallbackResult> => new Promise(resolve => {
  const query = Taro.createSelectorQuery();
  query
    .select(selector)
    .boundingClientRect((res: any) => {
      resolve(res);
    })
    .exec();
});

type MaxInfo = { maxHeight: number, maxWidth: number };

/**
 * 获取图片信息
 * @param src 图片地址
 * @returns
 */
export async function getImageInfo(src: string) {
  return new Promise<Taro.getImageInfo.SuccessCallbackResult & MaxInfo>((resolve, reject) => {
    const width = Taro.getSystemInfoSync().windowWidth;
    Taro.getImageInfo({
      src,
      success: (res) => {
        const maxHeight = res.height * width / res.width,
          maxWidth = res.width * width / res.height;

        resolve({
          ...res,
          maxHeight,
          maxWidth
        });
      },
      fail: reject
    });
  });
}

/**
 * 获取视频信息
 * @param src 视频地址
 * @returns
 */
export async function getHttpsVideoInfo(src: string) {
  return new Promise<Taro.getVideoInfo.SuccessCallbackResult & MaxInfo>((resolve, reject) => {
    const width = Taro.getSystemInfoSync().windowWidth;
    Taro.downloadFile({
      url: src,
      success(result) {
        Taro.getVideoInfo({
          src: result.tempFilePath,
          success: (res) => {
            const maxHeight = res.height * width / res.width,
              maxWidth = res.width * width / res.height;

            resolve({
              ...res,
              maxHeight,
              maxWidth
            });
          },
          fail: reject
        });
      }
    });

  });
}
