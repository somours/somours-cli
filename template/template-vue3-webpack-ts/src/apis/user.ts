import request from "@/utils/axios/index";
import {
  LoginParamsModel,
  LoginResultModel,
  MenuResultModel,
  UserInfoResultModel,
} from "./types/user";

// 登录
export const loginApi = (data: LoginParamsModel) =>
  request.post<LoginResultModel>("/sys/login", data);
// 获取用户信息
export const getUserInfoApi = (data?: any) =>
  request.post<UserInfoResultModel>("/sys/getUserInfo", data);
// 获取菜单
export const getMenuByUser = () =>
  request.get<MenuResultModel[]>("/sysMenu/selectMenusByUserId", {});
// 获取登录短信验证码
export const getLoginCode = (phone: string) =>
  request.get("/sys/getSmsCode", { params: { phone } }); // 获取注册验证码
