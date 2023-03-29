import { isNull } from "@/utils/is";
/*
 * @Description: web本地缓存
 * @Author: somours
 * @Date: 2022-03-24 17:35:06
 * @LastEditors: somours
 * @LastEditTime: 2022-03-24 19:39:46
 */

import { WebStorageOptions } from "./types";

// TODO 存储的值可能有敏感重要信息,估可使用crypto-js, encrypt、decrypyt进行加密、解密

const defaultOptions: WebStorageOptions = {
  prefix: "vite-vue3_dev_1.0", // 项目规范: 以项目名 + '_' + '当前环境' + '版本号': 如: vite-vue3_dev_1.0
  type: "localStorage",
};
class WebStorage {
  private storage: Storage;
  private prefix: string;
  private type: "localStorage" | "sessionStorage";
  constructor(options: WebStorageOptions) {
    const { prefix, type } = options;
    this.storage = type === "localStorage" ? localStorage : sessionStorage;
    this.prefix = prefix!;
    this.type = type;
  }
  /**
   * @descrition: 获取key
   * @param {string} key
   * @return {*}
   */
  private getKey(key: string) {
    return `${this.prefix}_${key}`.toUpperCase();
  }
  /**
   * @descrition: 获取
   * @param {string} key
   * @param {T} defaultData
   * @return {*}
   */
  getItem(key: string, defaultData: any = null): any {
    const valueStr = this.storage.getItem(this.getKey(key));
    if (!valueStr) {
      return defaultData;
    }
    try {
      const data = JSON.parse(valueStr);
      const { value, expire } = data;
      if (isNull(expire) || expire > Date.now()) {
        return value;
      }
      this.removeItem(key);
    } catch (e) {
      console.log("webStorage error", e);
      return defaultData;
    }
  }
  /**
   * @descrition: 设置
   * @param {string} key
   * @param {any} value
   * @param {number} expire
   * @return {*}
   */
  setItem(key: string, value: any, expire: number | null = null) {
    const valueStr = JSON.stringify({
      value,
      time: Date.now(),
      expire: isNull(expire) ? null : new Date().getTime() + expire! * 1000,
    });
    this.storage.setItem(this.getKey(key), valueStr);
  }
  /**
   * @descrition: 移除
   * @param {string} key
   * @return {*}
   */
  removeItem(key: string) {
    this.storage.removeItem(this.getKey(key));
  }
  /**
   * @descrition: 清除全部
   * @param {*}
   * @return {*}
   */
  clear() {
    this.storage.clear();
  }
}

export default new WebStorage(defaultOptions);
