import Taro from '@tarojs/taro';

export enum PAY_STATUS {
  SUCCESS = 'success',
  FAIL = 'fail',
  CANCEL = 'cancel',
  COMPLETE = 'complete'
}

/**
 * 支付订单
 * @param orderId 订单号
 * @returns
 */
export const OrderPay = (orderId: string) => {
  return new Promise<PAY_STATUS>((resolve, reject) => {
  //   PayOrder({
  //     outTradeNo: orderId
  //   }).then(async (_res) => {
  //     try {
  //       const _pay = await requestPayment(_res.data);
  //       resolve(_pay);
  //     } catch(_err) {
  //       reject(_err);
  //     }
  //   }).catch(_err => {
  //     reject(_err);
  //   });
  });
};

/**
 * 微信支付
 */
export function requestPayment(params: Taro.requestPayment.Option) {
  return new Promise<PAY_STATUS>((resolve, reject) => {
    try {
      const { timeStamp, nonceStr, paySign, signType = 'MD5' } = params;
      Taro.requestPayment({
        timeStamp,
        nonceStr,
        package: params.package,
        signType,
        paySign,
        success() {
          resolve(PAY_STATUS.SUCCESS);
        },
        fail(err) {
          console.error('requestPayment fail:>> ', err);
          if(err.errMsg.indexOf('cancel') > -1) {
            resolve(PAY_STATUS.CANCEL);
          } else {
            resolve(PAY_STATUS.FAIL);
          }
        },
        complete: () => {
          resolve(PAY_STATUS.COMPLETE);
        }
      });
    } catch(_err) {
      console.error('requestPayment error:>> ', _err);
      reject('catch');
    }
  });
}
