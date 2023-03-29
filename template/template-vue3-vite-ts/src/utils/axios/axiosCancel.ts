import { isFunction } from "../is";
import axios from "axios";
import type { AxiosRequestConfig, Canceler } from "axios";
/*
 * @Description:
 * @Author: somours
 * @Date: 2022-03-24 14:47:47
 * @LastEditors: somours
 * @LastEditTime: 2022-03-24 15:07:47
 */

let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join("&");

export class AxiosCancel {
  /**
   * @descrition: 添加请求
   * @param {AxiosRequestConfig} config
   * @return {*}
   */
  addPending(config: AxiosRequestConfig): void {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel: Canceler) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel);
        }
      });
  }
  /**
   * @descrition: 移除请求(单个)
   * @param {AxiosRequestConfig} config
   * @return {*}
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && cancel();
      pendingMap.delete(url);
    }
  }
  /**
   * @descrition: 取消所有
   * @param {*}
   * @return {*}
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }
  /**
   * @descrition: 重置
   * @param {*}
   * @return {*}
   */
  reset() {
    pendingMap = new Map<string, Canceler>();
  }
}
