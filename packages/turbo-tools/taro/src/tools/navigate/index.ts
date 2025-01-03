import Taro from '@tarojs/taro';
import { padQuery } from 'turboutils';

type NavigateParams = {
  type?: 'navigate' | 'navigateBack' | 'navigateBackTo' | 'redirect' | 'reLaunch';
  path?: string;
  query?: Record<string, any>;
  delta?: number;
  pageRoute?: string;
}

/**
 * `type`: 跳转方式 `navigate`, `navigateBack`, `navigateBackTo` `redirect` or `reLaunch`, default `navigate`
 *
 * `path`: 基础路径
 *
 * `query`: 查询参数
 *
 * `delta`: 后退页数(与`navigateBack`一起使用)
 *
 * `pageRoute`: 页面路由 后退到指定页(与`navigateBackTo`一起使用)。
 *
 *  跳转到
 *   navigateTo({
 *      type: 'navigate', path: '/pages/smart/addPlan', query: { id: 9527 }
 *   })
 *
 * 后退到指定页
 *   navigateTo({
 *     type: 'navigateBackTo', pageRoute: '/pages/smart/addPlan'
 *   })
 *
 * 后退2页
 *   navigateTo({
 *      type: 'navigateBack' , delta: 2
 *   })
 */
export default async function navigateTo(params: NavigateParams = {}) {
  const { type = 'navigate', path = '', query = {}, delta = 1, pageRoute = '' } = params;
  const url = padQuery(path, query);

  const navigateTo = ({
    navigate: Taro.navigateTo,
    navigateBack: Taro.navigateBack,
    redirect: Taro.redirectTo,
    reLaunch: Taro.reLaunch,
    navigateBackTo: void 0
  })[type];

  if(type === 'navigateBack') {
    return Taro.navigateBack({ delta });
  }

  if(type === 'navigateBackTo') {
    const pages = Taro.getCurrentPages();
    const index = pages.findIndex(page => page.route!.replace(/^\//, '') === pageRoute.replace(/^\//, ''));
    return Taro.navigateBack({ delta: pages.length - 1 - index });
  }

  if(typeof navigateTo === 'function') {
    try {
      return await navigateTo({ url });
    } catch(message) {
      return console.error(message);
    }
  }

  return Promise.reject(`Invalid navigate type for navigateTo(params): ${type}`);
}
