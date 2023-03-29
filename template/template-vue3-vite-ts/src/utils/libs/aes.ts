import CryptoJS from "crypto-js";
import { isObject, isString } from "@/utils/is";
import { globalSettings } from "@/configs";

const keyStr = globalSettings.environment.secretKey;
const ivStr = globalSettings.environment.offset;
const aesStr = globalSettings.environment.aes;
const aes = {
  // 加密CBC模式
  encrypt(word: string) {
    const key = CryptoJS.enc.Utf8.parse(keyStr);
    const iv = CryptoJS.enc.Utf8.parse(ivStr);
    const srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return aesStr + encrypted.toString();
  },
  // 解密CBC模式
  decrypt(word: string) {
    const key = CryptoJS.enc.Utf8.parse(keyStr);
    const iv = CryptoJS.enc.Utf8.parse(ivStr);
    const decrypt = CryptoJS.AES.decrypt(word, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
  },
};
export default aes;

export const decryptResponse = (responseData: any) => {
  let result = "";
  // console.log('typeof responseData', typeof responseData, responseData)
  if (isString(responseData) && responseData.indexOf(aesStr) !== -1) {
    const index = responseData.indexOf(aesStr);
    const tempStr = responseData.slice(
      index + aesStr.length,
      responseData.length
    );
    result = JSON.parse(aes.decrypt(tempStr));
    return result;
  } else {
    // 否则按原参数返回
    return responseData;
  }
};

// 本地加密解密
const localSecret = {
  /**
   * base64解密
   * @param String
   */
  decrypt: (str: string) => {
    let result = "";
    try {
      result = CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.warn("本地解密失败", e);
    }
    return result;
  },

  /**
   * base64加密
   * @param String
   */
  encrypt: (str: string) => {
    let result = "";
    try {
      result = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
    } catch (e) {
      console.warn("本地加密失败", e);
    }
    return result;
  },
};

// url查询参数加密
export const urlQueryEncrypt = (query: any, addParams = true) => {
  let str = query;
  if (isObject(str)) {
    str = JSON.stringify(str);
  }
  const tempStr = localSecret.encrypt(str);
  return addParams
    ? {
        params: tempStr,
      }
    : tempStr;
};

// url查询参数解密
export const urlQueryDecrypt = (query: any, needParse = true) => {
  let resultStr = "";
  if (isObject(query)) {
    const params = query.params;
    resultStr = localSecret.decrypt(params);
  }
  if (isString(query)) {
    let tempStr = query;
    try {
      tempStr = decodeURIComponent(query);
    } catch (e) {
      console.log("decodeURIComponent解析失败", e);
    }
    resultStr = localSecret.decrypt(tempStr);
  }
  if (needParse) {
    try {
      resultStr = JSON.parse(resultStr);
    } catch (e) {
      console.log("JSON.parse解析失败", e);
    }
  }
  return resultStr;
};
