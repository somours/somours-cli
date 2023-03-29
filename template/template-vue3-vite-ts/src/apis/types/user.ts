// 登录接口参数
export interface LoginParamsModel {
  // 用户名登录
  loginName?: string;
  password?: string;
  imageCode?: number | string;

  isOpenPhoneCaptchaLogin?: number;
  systemType?: number;

  // 手机号登录
  phone?: string;
  code?: string | number;
}

// 登录成功结果
export interface LoginResultModel {
  token: string;
  [propName: string]: any;
}

// 获取用户信息的接口返回
export interface UserInfoResultModel {
  ipAddress?: string;
  roleList: any[];
  sysPageConfig: PlainObjectOf; // 系统常用配置对象
  sysUser: UserInfoModel;
}

// 用户信息
export interface UserInfoModel {
  id: number;
  phone: string;
  enable?: number;
  loginName: string;
  nickname: string;
  parentId?: number | null;
  systemType?: number;
  [propName: string]: any;
}

// 角色
export type Role = string;

// 接口返回的菜单
export interface MenuResultModel {
  parentId?: number;
  name: string;
  sort?: number;
  status: number | string;
  icon?: string;
  id: number;
  url: string;
  childrenMenus: MenuResultModel[];
  [propName: string]: any;
}
