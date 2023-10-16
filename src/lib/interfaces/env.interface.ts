enum NodeEnv {
  Production = "production",
  Development = "development",
  Test = "test",
}

interface Env {
  nodeEnv?: NodeEnv;
  apiURL?: string;
  publicKey?: string;
}

type Config = Required<Env>;

export { Env, Config, NodeEnv };
