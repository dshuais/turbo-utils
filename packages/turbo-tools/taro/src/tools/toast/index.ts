import Taro from '@tarojs/taro';

/**
 * Toast
 */
export const $toast = {

  /** 提示 */
  show: (message: string) => {
    Taro.showToast({
      title: message,
      icon: 'none'
    });
  },

  /** 成功 */
  success: (message: string) => {
    Taro.showToast({
      title: message,
      icon: 'success'
    });
  },

  /** 失败 */
  error: (message: string) => {
    Taro.showToast({
      title: message,
      icon: 'error'
    });
  },

  /** 加载中 */
  loading: (message: string = '加载中...') => {
    Taro.showLoading({
      title: message,
      mask: true
    });
  },

  /** 关闭 */
  hide: () => {
    Taro.hideToast();
    Taro.hideLoading();
  },

  /** 消息确认框 公共样式 */
  modal: (props: Taro.showModal.Option & { onOk?: () => void, onCancel?: () => void }) => {
    const { onOk, onCancel, ...rest } = props;
    Taro.showModal({
      title: '提示',
      content: '确认当前操作吗？',
      cancelText: '取消',
      confirmText: '确定',
      cancelColor: '#242424',
      confirmColor: '#BAF64B',
      showCancel: true,
      success: (res) => {
        if(res.confirm) {
          onOk && onOk();
        } else if(res.cancel) {
          onCancel && onCancel();
        }
      },
      ...rest
    });
  },

  /** 接口error提示框 */
  apiError: (error: any, message: string = '系统异常') => {
    $toast.show(error?.data?.message || error?.data?.msg || message);
    console.error('apiError:>> ', error);
  }
};

export default $toast;
