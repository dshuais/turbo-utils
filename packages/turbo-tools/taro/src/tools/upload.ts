import Taro from '@tarojs/taro';

/**
 * 选择图片（默认上传）
 * @param {Object} param Taro.chooseImage参数
 */
export function ChooseImage({
  count = 9, // 默认9
  sizeType = ['original', 'compressed'],
  sourceType = ['album', 'camera']
}: Taro.chooseImage.Option) {
  return new Promise<Taro.chooseImage.SuccessCallbackResult>((resolve, reject) => {
    Taro.chooseImage({
      count, // 默认9
      sizeType, // 可以指定是原图还是压缩图，默认二者都有
      sourceType, // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: res => {

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // const filePaths = res.tempFilePaths || [];

        resolve(res);
      }
    });
  });
}

/**
 * 拍摄或从手机相册中选择图片或视频
 * @param {Object} param {maxDuration, mediaType, sourceType}
 */
export function UploadMedia({ maxDuration, mediaType, sourceType, count = 9 }: Taro.chooseMedia.Option) {
  return new Promise<Taro.chooseMedia.SuccessCallbackResult>((resolve, reject) => {
    const MAX_DURATION = maxDuration || 60; // 秒
    Taro.chooseMedia({
      count,
      mediaType,
      sourceType,
      maxDuration: MAX_DURATION,
      camera: 'back',
      success: res => {
        resolve(res);
      },
      fail: err => {
        console.warn(err);
        reject(err);
      }
    });
  });
}
