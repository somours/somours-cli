import { devEnv, testEnv, pressureEnv, prodEnv } from "./prod";
import { developmentEnv } from "./dev";
import { Environments } from "./type";

const allEnvs: Recordable<Environments> = {
  dev: devEnv,
  test: testEnv,
  pressure: pressureEnv,
  prod: prodEnv,
  development: developmentEnv,
};

let vueAppEnv = process.env.VUE_APP_ENV;
if (process.env.NODE_ENV !== "production") {
  vueAppEnv = "development";
}

export const environment = allEnvs[vueAppEnv];
