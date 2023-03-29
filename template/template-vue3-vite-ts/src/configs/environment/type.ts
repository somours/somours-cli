export interface Environments {
  baseUrl: string; // 接口请求域名
  apiPrefix: string; // 接口请求前缀,一般对应于后端的服务
  uploadApi: string; // 图片上传地址
  videoUploadApi: string; // 视频上传地址
  fileDownloadApi: string; // 文件下载地址
  websocketPath: string; // websoket地址
  imgBaseUrl: string; // 图片访问路径
  protocolPath: string; // 协议路径
  mapKey: string; // 高德地图的key(公司)
  signKey: string; // 签名的key
  aes: string; // 加密解密前缀
  secretKey: string; // 解密用的key
  offset: string;
  isNeedAes: boolean; // 是否需要加密
  sip_url: string; // sip:1008@172.18.13.25
  sip_socket_url: string;
  sip_session_timmers_expires: string | number; // 会话计时器间隔
  sip_register_expires: string | number; // 注册到期时间
  agreementPath: string;
}
