import { isObject } from "@/utils/is";
import md5 from "js-md5";
import { globalSettings } from "@/configs";
import { useDebounceFn } from "@vueuse/core";

/**
 * @descrition: 简单深拷贝
 * @param {any} source
 * @param {any} target
 * @return {*}
 */
export function deepMerge<T = any>(source: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    source[key] = isObject(source[key])
      ? deepMerge(source[key], target[key])
      : target[key];
  }
  return source;
}

/**
 * 创建请求头sign
 * @param data(Object) 请求参数
 * @param isJson
 * @returns String
 */
export const createRequestSign = function (
  data: Recordable,
  isJson: boolean,
  timestamps: number
) {
  const keyList = Object.keys(data).sort();
  let urlParams = "";
  const sortKey = keyList.filter((key) => {
    if (data[key] != null && data[key] !== "") return key;
  });
  if (isJson) {
    urlParams = JSON.stringify(data) + `&timestamps=${timestamps}`;
  } else {
    for (const key of sortKey) {
      urlParams +=
        sortKey[sortKey.length - 1] !== key
          ? `${key}=${data[key]}&`
          : `${key}=${data[key]}`;
    }
  }
  return md5(`${urlParams}&signKey=${globalSettings.environment.signKey}`);
};

export { useDebounceFn };
