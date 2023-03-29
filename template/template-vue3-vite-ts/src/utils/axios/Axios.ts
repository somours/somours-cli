import { isFunction } from "../is";
import { RequestOptions, ResponseResult, UploadParams } from "./types";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosOptions } from "./types";
import { contentTypeEnum } from "@/enums/common";

export default class MyAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: AxiosOptions;
  constructor(options: AxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setInterceptors();
  }

  /**
   * @descrition: 创建实例后生成axiosInstance
   * @param {AxiosOptions} options
   * @return {*}
   */
  private createAxios(options: AxiosOptions): void {
    this.axiosInstance = axios.create(options);
    this.setInterceptors();
  }

  /**
   * @descrition: 设置请求头
   * @param {any} headers
   * @return {*}
   */
  setHeaders(headers: any) {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  /**
   * @descrition: 获取transform
   * @param {*}
   * @return {*}
   */
  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  /**
   * @descrition: 设置拦截器
   * @param {*}
   * @return {*}
   */
  setInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    // 配置链: chains = [请求拦截器1, 请求拦截器2, dispatchRequest, undefined, 响应拦截器1，响应拦截器2]
    // 执行链: promise = promise.then(chain.shift(),chain.shift())
    // 多个请求拦截器, 执行顺序: 先配置先执行
    // 多个相应拦截器,返回的数据是最后一个响应拦截器处理后的数据

    // TODO 此处不明白将(请求,请求错误处理),(响应,响应错误处理)为何不添加到一个拦截器里,而写成两个

    // 请求拦截器配置
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config, this.options);
        }
        return config;
      },
      undefined
    );
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch
      );
    // 响应拦截器配置
    this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      if (responseInterceptors && isFunction(responseInterceptors)) {
        response = responseInterceptors(response);
      }
      return response;
    }, undefined);
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(
        undefined,
        responseInterceptorsCatch
      );
  }

  /**
   * @descrition: 上传接口,一般上传接口不同于其他接口
   * @param {AxiosRequestConfig} config
   * @param {UploadParams} uploadParams
   * @return {*}
   */
  upload<T = any>(config: AxiosRequestConfig, uploadParams: UploadParams) {
    const formData = new window.FormData();
    const customFilename = uploadParams.name || "file";
    if (uploadParams.filename) {
      formData.append(customFilename, uploadParams.file, uploadParams.filename);
    } else {
      formData.append(customFilename, uploadParams.file);
    }

    if (uploadParams.data) {
      Object.keys(uploadParams.data).forEach((key) => {
        const value = uploadParams.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }
        formData.append(key, uploadParams.data![key]);
      });
    }
    return this.axiosInstance.request<T>({
      ...config,
      method: "POST",
      data: formData,
      headers: {
        "Content-type": contentTypeEnum.FORM_DATA,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        ignoreCancelToken: true,
      },
    });
  }

  /**
   * @descrition: get请求
   * @param {*}
   * @return {*}
   */
  get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
    requestOptions?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, url, method: "GET" }, requestOptions);
  }
  /**
   * @descrition: post请求
   * @param {*}
   * @return {*}
   */
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    requestOptions?: RequestOptions
  ): Promise<T> {
    return this.request(
      { ...config, url, data, method: "POST" },
      requestOptions
    );
  }
  /**
   * @descrition: put请求
   * @param {*}
   * @return {*}
   */
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    requestOptions?: RequestOptions
  ): Promise<T> {
    return this.request(
      { ...config, url, data, method: "PUT" },
      requestOptions
    );
  }
  /**
   * @descrition: patch请求
   * @param {*}
   * @return {*}
   */
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    requestOptions?: RequestOptions
  ): Promise<T> {
    return this.request(
      { ...config, url, data, method: "patch" },
      requestOptions
    );
  }
  /**
   * @descrition: delete请求
   * @param {*}
   * @return {*}
   */
  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
    requestOptions?: RequestOptions
  ): Promise<T> {
    return this.request({ ...config, url, method: "DELETE" }, requestOptions);
  }
  /**
   * @descrition: request
   * @param {*}
   * @return {*}
   */
  request<T = any>(
    config: AxiosRequestConfig,
    requestOptions?: RequestOptions
  ): Promise<T> {
    let conf: AxiosOptions = config;
    const defaultOptions = this.options.requestOptions;
    const opt: RequestOptions = Object.assign(
      {},
      defaultOptions,
      requestOptions
    );
    const transform = this.getTransform();
    // 增加请求前钩子函数
    const { beforeRequestHook, transformRequestHook } = transform!;
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(config, opt);
    }
    conf.requestOptions = opt;
    return new Promise((resolve, reject) => {
      // TODO 此处实际请求数据中看是否传规则AxiosRequestConfig的config,而不是传AxiosOptions的conf
      return this.axiosInstance
        .request<T, AxiosResponse<ResponseResult<T>>>(conf)
        .then((res: AxiosResponse<ResponseResult<T>>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (error) {
              reject(error || "请求错误");
            }
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
