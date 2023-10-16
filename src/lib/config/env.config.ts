import { verifyEnv } from "../utils";
import { Env, Config } from "../interfaces";

const env: Env = {
  nodeEnv: import.meta.env.VITE_NODE_ENV,
  apiURL: import.meta.env.VITE_API_URL,
  publicKey: `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmRIMxyO4GinTtZiJ1y1r
  qFinSea8pnV/5il1PUryd1Kv5aoZSpyp3zxgnepx1aMqmHwXPWQkmRzz7Joq1Ex+
  OrNBWZL29mLj3P/w6NBPdvk6KxBKuPcxDjuluUuDPhwGTsOSupwQWzoE68zuLFsP
  OJfakSR8s0eBvpwHACT6G4+qvUrNg0BLYDKeEom4fa6LdgSMgOaZiqbV9nyqOxg0
  nrvAsfwfaHLy2msJVOIrEaBSsmM6Asa1GJfQ+WRjbKZx53hREMM7J6WZIGzceaM3
  s3F++viUi62BJGaJtzO0n3MzAqIEwGUet5w24jkRgdxp5eSh7mMtaNO1GRU/pFDz
  vQIDAQAB
  -----END PUBLIC KEY-----`,
};

const config: Config = verifyEnv(env);

export default config;
