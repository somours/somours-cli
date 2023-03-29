// 打包环境
import { Environments } from "./type";
export const devEnv: Environments = {
  baseUrl: "https://dev-gw.youxinsign.com", // 接口请求域名
  apiPrefix: "/rxk-saas/web/youka", // 接口请求前缀,一般对应于后端的服务
  uploadApi: "https://dev-gw.youxinsign.com/rxk-saas/web/img/upload", // 图片上传地址
  videoUploadApi:
    "https://dev-gw.youxinsign.com/rxk-saas/web/video/transUpload", // 视频上传地址
  fileDownloadApi: "https://dev-gw.youxinsign.com/rxk-saas/web/file/download", // 文件下载地址
  websocketPath: "https://dev-wss.youxinsign.com", // websoket地址
  imgBaseUrl: "https://dev-upload.youxinsign.com", // 图片访问路径
  protocolPath: "", // 协议路径
  mapKey: "", // 高德地图的key(公司)
  signKey:
    "", // 签名的key
  aes: "", // 加密解密前缀
  secretKey: "", // 解密用的key
  offset: "",
  isNeedAes: false, // 是否需要加密
  sip_url: "@121.40.141.201", // sip:1008@172.18.13.25
  sip_socket_url: "wss://test-yocwebrtc.youxinsign.com:7443",
  sip_session_timmers_expires: "150", // 会话计时器间隔
  sip_register_expires: "300", // 注册到期时间
  agreementPath: "https://dev-agreement.youxinsign.com", // 协议的地址,默认都写成线上的看一个地方即可
};

// 测试环境
export const testEnv: Environments = {
  baseUrl: "https://test-gw.youxinsign.com", // 接口请求域名
  apiPrefix: "/rxk-saas/web/youka", // 接口请求前缀,一般对应于后端的服务
  uploadApi: "https://test-gw.youxinsign.com/rxk-saas/web/img/upload", // 图片上传地址
  videoUploadApi:
    "https://test-gw.youxinsign.com/rxk-saas/web/video/transUpload", // 视频上传地址
  fileDownloadApi: "https://test-gw.youxinsign.com/rxk-saas/web/file/download", // 文件下载地址
  websocketPath: "https://test-wss.youxinsign.com", // websoket地址
  imgBaseUrl: "https://test-upload.youxinsign.com", // 图片访问路径
  protocolPath: "", // 协议路径
  mapKey: "", // 高德地图的key(公司)
  signKey:
    "", // 签名的key
  aes: "", // 加密解密前缀
  secretKey: "", // 解密用的key
  offset: "",
  isNeedAes: true, // 是否需要加密
  sip_url: "@121.40.141.201", // sip:1008@172.18.13.25
  sip_socket_url: "wss://test-yocwebrtc.youxinsign.com:7443",
  sip_session_timmers_expires: "150", // 会话计时器间隔
  sip_register_expires: "300", // 注册到期时间
  agreementPath: "https://test-agreement.youxinsign.com", // 协议的地址,默认都写成线上的看一个地方即可
};

// 线上环境
export const prodEnv: Environments = {
  baseUrl: "https://gw.youxinsign.com", // 接口请求域名
  apiPrefix: "/rxk-saas/web/youka", // 接口请求前缀,一般对应于后端的服务
  uploadApi: "https://gw.youxinsign.com/rxk-saas/web/img/upload", // 图片上传地址
  videoUploadApi: "https://gw.youxinsign.com/rxk-saas/web/video/transUpload", // 视频上传地址
  fileDownloadApi: "https://gw.youxinsign.com/rxk-saas/web/file/download", // 文件下载地址
  websocketPath: "https://wss.youxinsign.com", // websoket地址
  imgBaseUrl: "https://upload.youxinsign.com", // 图片访问路径
  protocolPath: "", // 协议路径
  mapKey: "", // 高德地图的key(公司)
  signKey:
    "", // 签名的key
  aes: "", // 加密解密前缀
  secretKey: "", // 解密用的key
  offset: "",
  isNeedAes: true, // 是否需要加密
  sip_url: "@47.98.185.236", // sip:1008@172.18.13.25
  sip_socket_url: "wss://yocwebrtc.youxinsign.com:7443",
  sip_session_timmers_expires: "150", // 会话计时器间隔
  sip_register_expires: "300", // 注册到期时间
  agreementPath: "https://agreement.youxinsign.com", // 协议的地址,默认都写成线上的看一个地方即可
};

// 压力测试环境
export const pressureEnv: Environments = {
  baseUrl: "https://pressure-gw.youxinsign.com", // 接口请求域名
  apiPrefix: "/rxk-saas/web/youka", // 接口请求前缀,一般对应于后端的服务
  uploadApi: "https://pressure-gw.youxinsign.com/rxk-saas/web/img/upload", // 图片上传地址
  videoUploadApi:
    "https://pressure-gw.youxinsign.com/rxk-saas/web/video/transUpload", // 视频上传地址
  fileDownloadApi:
    "https://pressure-gw.youxinsign.com/rxk-saas/web/file/download", // 文件下载地址
  websocketPath: "https://pressure-wss.youxinsign.com", // websoket地址
  imgBaseUrl: "https://pressure-upload.youxinsign.com", // 图片访问路径
  protocolPath: "", // 协议路径
  mapKey: "", // 高德地图的key(公司)
  signKey:
    "", // 签名的key
  aes: "", // 加密解密前缀
  secretKey: "", // 解密用的key
  offset: "",
  isNeedAes: true, // 是否需要加密
  sip_url: "@47.98.185.236", // sip:1008@172.18.13.25
  sip_socket_url: "wss://yocwebrtc.youxinsign.com:7443",
  sip_session_timmers_expires: "150", // 会话计时器间隔
  sip_register_expires: "300", // 注册到期时间
  agreementPath: "https://pressure-agreement.youxinsign.com", // 协议的地址,默认都写成线上的看一个地方即可
};
