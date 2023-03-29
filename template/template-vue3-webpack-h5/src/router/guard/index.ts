import type { Router } from "vue-router";
export const createRouterCommonGuard = (router: Router) => {
  router.beforeEach((to, from, next) => {
    document.title = (to.meta.title as string) || "";
    next();
  });
};
