// 本地开发环境
import { Environments } from "./type";

export const developmentEnv: Environments = {
  baseUrl: "https://test-gw.youxinsign.com", // 接口请求域名
  // baseUrl: "http://192.168.30.241:8081", // 接口请求域名
  apiPrefix: "/rxk-saas/web/youka", // 接口请求前缀,一般对应于后端的服务
  uploadApi: "https://dev-gw.youxinsign.com/rxk-saas/web/img/upload", // 图片上传地址
  videoUploadApi:
    "https://dev-gw.youxinsign.com/rxk-saas/web/video/transUpload", // 视频上传地址
  fileDownloadApi: "https://dev-gw.youxinsign.com/rxk-saas/web/file/download", // 文件下载地址
  // websocketPath: 'https://dev-wss.youxinsign.com', // websoket地址
  websocketPath: "http://192.168.30.133:52999", // websoket地址
  imgBaseUrl: "https://dev-upload.youxinsign.com", // 图片访问路径
  protocolPath: "", // 协议路径
  mapKey: "de9b8f465f36876c10e3411e75c53062", // 高德地图的key(公司)
  signKey:
    "NmFhYjEzYWFlOTFlN2Q2ZmJiZDAzOGYzODY4ZDdiNzg3OWZkYzYzOTg2M2RjM2RhOGNkYmE1YTRhNzMxYjIwMA==", // 签名的key
  aes: "enc-", // 加密解密前缀
  secretKey: "GQDTXGf7EZuCqwNG", // 解密用的key
  offset: "8GUUxywnlW0v9hk6",
  isNeedAes: true, // 是否需要加密
  sip_url: "@121.40.141.201", // sip:1008@172.18.13.25
  sip_socket_url: "wss://test-yocwebrtc.youxinsign.com:7443",
  sip_session_timmers_expires: "150", // 会话计时器间隔
  sip_register_expires: "300", // 注册到期时间
  agreementPath: "https://test-agreement.youxinsign.com", // 协议的地址,默认都写成线上的看一个地方即可
};
