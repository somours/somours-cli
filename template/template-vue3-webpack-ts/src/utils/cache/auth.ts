import { webStorage } from "@/utils/cache/index";

export const TokenKey = "token";

/** token **/
export function getToken() {
  return webStorage.getItem(TokenKey);
}

export function setToken<T>(token: T) {
  return webStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return webStorage.removeItem(TokenKey);
}
