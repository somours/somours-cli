/*
 * @Description: 一些全局的类型声明
 */

declare type Nullable<T> = T | null;

declare type TimeoutHandler = ReturnType<typeof setTimeout>;

declare type IntervalHandler = ReturnType<typeof setInterval>;

declare type Recordable<T = any> = Record<string, T>;

declare interface PlainObjectOf<V = any> {
  [_: string]: V;
}

declare type CommonFunction = (...args: any[]) => void;

declare type Fn<T = any> = (...args: any[]) => T;

declare type PromiseFn<R = any> = (...arg: any[]) => Promise<R>;

declare interface ValueLabelObj<V = string | number> {
  value: V;
  label: string;
  [_: string]: any;
}

declare interface VueEnv {
  VUE_APP_ENV: "dev" | "test" | "pressure" | "prod" | "development";
  NODE_ENV: string;
}

declare module "crypto-js";

declare module "js-md5";
