import { Env, Config, NodeEnv } from "../interfaces";

const verifyEnv = (env: Env): Config => {
  Object.entries(env).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`Environment variable ${key} is not defined`);
    }

    if (key === "nodeEnv" && !Object.values(NodeEnv).includes(value)) {
      throw new Error(`Environment variable nodeEnv is not valid`);
    }

    if (key === "apiURL") {
      const url = new URL(value);
      if (env.nodeEnv === NodeEnv.Production && url.protocol !== "https:") {
        throw new Error(`Environment variable apiURL is not valid`);
      } else {
        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error(`Environment variable apiURL is not valid`);
        }
      }
    }
  });

  return env as Config;
};

export { verifyEnv };
