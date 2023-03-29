/*
 * @Description:
 * @Author: somours
 * @Date: 2022-03-23 10:28:21
 * @LastEditors: somours
 * @LastEditTime: 2022-03-24 14:15:18
 */

import { contentTypeEnum, responseResultEnum } from "@/enums/common";
import { AxiosOptions, RequestOptions, ResponseResult } from "./types";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import MyAxios from "./Axios";
import { createRequestSign, deepMerge } from "../tools";
import {ElMessage} from "element-plus";
import { getToken } from "@/utils/cache/auth";
import { checkStatus } from "@/utils/axios/checkStatus";
import { globalSettings } from "@/configs";
import aes, { decryptResponse } from "@/utils/libs/aes";
import qs from "qs";

const defaultOptions: AxiosOptions = {
  timeout: 5 * 1000, // 超时时间5s
  // headers: { "Content-type": contentTypeEnum.JSON },
  transformRequest: [
    function (data, headers) {
      const contentType: string = headers!["Content-Type"] as string;
      if (contentType === contentTypeEnum.JSON) {
        if (globalSettings.environment.isNeedAes) {
          // 是否需要加密
          return aes.encrypt(JSON.stringify(data || {}));
        } else {
          return JSON.stringify(data || {});
        }
      }
      if (contentType === contentTypeEnum.FORM_URLENCODED) {
        return qs.stringify(data, { indices: false });
      }
      return data;
    },
  ],
  requestOptions: {
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    isReturnNativeResponse: false, // response
    // 需要对返回数据进行处理
    isTransformResponse: true, // false为response.data, true为自定义,根据后端接口结构而定
    // 消息提示类型
    errorMessageMode: "message",
    // 接口地址, 由不同环境提供,相当于axios的baseUrl
    apiUrl: globalSettings.environment.baseUrl, //globSetting.baseUrl,
    // 请求地址前缀, 由不同环境提供
    urlPrefix: globalSettings.environment.apiPrefix, // apiPrefix,
    // 是否加入时间戳
    isJoinTimestamp: true,
    // 是否加入token
    withToken: true,
    isNeedLoading: false,
    isNeedSign: true,
  },
  transform: {
    // 相当于之前响应拦截器里面的配置
    transformRequestHook: (
      response: AxiosResponse,
      requestOptions: RequestOptions
    ) => {
      const { isReturnNativeResponse, isTransformResponse } = requestOptions;
      // 是否要返回原生响应头
      if (isReturnNativeResponse) {
        return response;
      }
      // 不进行任何处理，直接返回
      // 用于页面代码可能需要直接获取code，data，message这些信息时开启
      if (!isTransformResponse) {
        return response.data;
      }
      // 接口错误时报错
      const responseData = decryptResponse(response.data) as ResponseResult;
      if (!responseData) {
        throw new Error("请求出错,请稍后再试");
        return;
      }
      // 接口成功返回
      //  这里 code，data，message为 后台统一的字段，可根据实际项目在 types.ts内修改为项目自己的接口返回格式
      const { code, msg, data } = responseData;
      console.log(
        "responseData",
        responseData,
        code === responseResultEnum.SUCCESS
      );
      const isSuccess = data && code === responseResultEnum.SUCCESS;
      if (isSuccess) {
        return data;
      }
      // 根据code做不同的处理
      const tipMessage = msg || "";
      switch (code) {
        case responseResultEnum.NOT_LOGIN:
        case responseResultEnum.AUTH_ERROR:
          // 退出登录操作
          // getToken()
          //   ? store.dispatch("FedLogOut").finally(() => {
          //       location.reload(); // 为了重新实例化vue-router对象 避免bug
          //     })
          //   : store.dispatch("FedLogOut").then();
          break;
        case responseResultEnum.BLACKLIST:
          // store.dispatch("ShowBlackList");
          break;
        default:
          break;
        // tipMessage = message!;
      }
      // 提示错误消息
      ElMessage({
        type: "error",
        message: tipMessage,
      });
      throw new Error(tipMessage || "请求出错,请稍后再试");
    },
    /**
     * @descrition: 请求之前钩子函数
     */
    beforeRequestHook: (
      config: AxiosRequestConfig,
      requestOptions: RequestOptions
    ) => {
      const {
        apiUrl = "",
        urlPrefix = "",
        withToken,
        // isNeedLoading,
        isNeedSign = false,
        isJoinTimestamp,
      } = requestOptions;
      // 是否需要设置loading
      // isNeedLoading && startLoading();
      // 处理url
      config.url = apiUrl! + urlPrefix! + config.url;
      const headers = config.headers || {
        "Content-Type": contentTypeEnum.JSON,
      };
      // 处理token, 给头部加上token
      if (withToken) {
        const token = getToken();
        if (token) {
          headers.token = token;
        }
      }
      // 设置头部签名sign
      const data = config.data || config.params || {};
      const headInfo = {
        timestamps: new Date().getTime(),
      };
      if (isJoinTimestamp) {
        headers.timestamps = headInfo.timestamps;
      }
      const isJson = headers["Content-Type"] === contentTypeEnum.JSON;
      if (isNeedSign) {
        const tempData = isJson ? data : Object.assign(headInfo, data);
        headers.sign = createRequestSign(
          tempData,
          isJson,
          headInfo.timestamps
        ).toUpperCase();
      }
      config.headers = headers;
      return config;
    },
    /**
     * @descrition: 请求拦截器
     */
    requestInterceptors: (config: AxiosRequestConfig) => {
      return config;
    },
    /**
     * @description: 响应拦截器处理
     */
    responseInterceptors: (res: AxiosResponse<any>) => {
      return res;
    },
    responseInterceptorsCatch: (error: any) => {
      const { response, code = "", message = "" } = error || {};
      const msg = response?.data?.error?.message ?? "";
      const err = error?.toString?.() ?? "";
      let errMessage = "";
      try {
        if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
          errMessage = "网络异常，请检查您的网络连接是否正常!";
        }
        if (err?.includes("Network Error")) {
          errMessage = "网络异常";
        }

        if (errMessage) {
          ElMessage({
            type: "error",
            message: errMessage,
          });
          return Promise.reject(error);
        }
      } catch (error) {
        throw new Error(error as unknown as string);
      }
      checkStatus(error?.response?.status, msg);
      return Promise.reject(error);
    },
  },
};

function createAxios(options?: Partial<AxiosOptions>) {
  return new MyAxios(deepMerge(defaultOptions, options || {}));
}

export default createAxios();
