export interface IProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
