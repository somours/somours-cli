const toString = Object.prototype.toString;
/**
 * @Description:
 * @Param {val} 任意数据类型
 * @Return {type} string, 如 Object
 */
export function is(val: any, type: string): boolean {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * @Description: 是否是undefined
 * @Param {*}
 * @Return {*}
 */
export function isUndef(val: any): boolean {
  return val === undefined;
}

/**
 * @Description: 是否是null
 * @Param {*}
 * @Return {*}
 */
export function isNull(val: any): boolean {
  return val === null || val === "" || val === undefined;
}

/**
 * @Description: 是否是undefined或者null
 * @Param {*}
 * @Return {*}
 */
export function isNullOrUnDef(val: any): boolean {
  return isNull(val) || isUndef(val);
}
/**
 * @Description: 是否是undefined或者null或者''
 * @Param {*}
 * @Return {*}
 */
export function isNullOrUndefOrEmpty(val: any): boolean {
  return isNullOrUnDef(val) || val === "";
}
/**
 * @Description: 空数据时, 数组为空数组,对象为空对象, 字符串为空字符串, Map,Set 也可判断
 * @Param {*}
 * @Return {*}
 */
export function isEmpty(val: any): boolean {
  if (isNullOrUnDef(val)) {
    return isNullOrUnDef(val);
  }
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }
  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }
  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }
  return false;
}

/**
 * @Description: 是否是普通对象
 * @Param {*}
 * @Return {*}
 */
export function isObject(val: any): val is Record<string, any> {
  return val !== null && is(val, "Object");
}
/**
 * @Description: 是否是普通对象
 * @Param {*}
 * @Return {*}
 */
export function isFormData(val: any): boolean {
  return val !== null && is(val, "FormData");
}

/**
 * @Description: 是否是函数
 * @Param {*}
 * @Return {*}
 */
export function isFunction(val: any): val is Fn {
  return typeof val === "function";
}
/**
 * @Description: 是否是布尔值
 * @Param {*}
 * @Return {*}
 */
export function isBoolean(val: any): boolean {
  return is(val, "Boolean");
}
/**
 * @Description: 是否是正则对象
 * @Param {*}
 * @Return {*}
 */
export function isRegExp(val: any): val is RegExp {
  return is(val, "RegExp");
}
/**
 * @Description: 是否是字符串
 * @Param {*}
 * @Return {*}
 */
export function isString(val: any): val is string {
  return is(val, "String");
}
/**
 * @Description: 是否是数字
 * @Param {*}
 * @Return {*}
 */
export function isNumber(val: any): val is number {
  // 是数字并且不是NAN
  return is(val, "Number") && !Number.isNaN(val);
}

/**
 * @Description: 是否是数组
 * @Param {*}
 * @Return {*}
 */

export function isArray(val: any): boolean {
  return val && Array.isArray(val);
}
