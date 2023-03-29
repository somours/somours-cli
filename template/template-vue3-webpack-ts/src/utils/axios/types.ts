import { AxiosResponse } from "axios";
/*
 * @Description: 封装axios的类型声明
 * @Author: somours
 * @Date: 2022-03-23 11:24:24
 * @LastEditors: somours
 * @LastEditTime: 2022-03-24 15:41:31
 */
import { AxiosRequestConfig } from "axios";

export interface AxiosOptions extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
  transform?: AxiosTransform;
}

export type ErrorMessageMode = "none" | "modal" | "message" | undefined;

export interface RequestOptions {
  loading?: boolean;
  errorMessageMode?: ErrorMessageMode;
  isReturnNativeResponse?: boolean;
  isTransformResponse?: boolean;
  apiUrl?: string;
  urlPrefix?: string;
  isJoinTimestamp?: boolean;
  withToken?: boolean;
  needCache?: boolean; // 是否需要缓存
  isNeedLoading?: boolean; // 是否需要loading效果
  isNeedSign?: boolean; // 是否需要签名
}

export interface ResponseResult<T = any> {
  code: number | string;
  type: "success" | "error" | "warning";
  msg?: string;
  data: T;
}

export interface UploadParams {
  data?: Recordable;
  name?: string;
  file: File | Blob;
  filename?: string;
  [key: string]: any;
}

export abstract class AxiosTransform {
  /**
   * @descrition: 请求之前的钩子函数,用于同一配置
   * @param {*}
   * @return {*}
   */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions
  ) => AxiosRequestConfig;

  /**
   * @descrition: 请求成功后的钩子,可统一配置相应结果
   * @param {*}
   * @return {*}
   */
  transformRequestHook?: (
    res: AxiosResponse<ResponseResult>,
    options: RequestOptions
  ) => any;

  /**
   * @descrition: 请求失败的处理
   * @param {*}
   * @return {*}
   */
  requestCatchHook?: (e: Error, options: AxiosOptions) => Promise<any>;

  /**
   * @descrition: 请求拦截器
   * @param {*}
   * @return {*}
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: AxiosOptions
  ) => AxiosRequestConfig;

  /**
   * @descrition: 响应拦截器
   * @param {*}
   * @return {*}
   */
  responseInterceptors?: (response: AxiosResponse) => AxiosResponse;

  /**
   * @descrition: 请求拦截器错误处理
   * @param {*}
   * @return {*}
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @descrition: 响应拦截器错误处理
   * @param {*}
   * @return {*}
   */
  responseInterceptorsCatch?: (error: Error) => void;
}
