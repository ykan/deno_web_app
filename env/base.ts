export interface Env {
  // 端口
  readonly port: number;
}

export const baseEnv: Env = {
  port: 8080,
};
