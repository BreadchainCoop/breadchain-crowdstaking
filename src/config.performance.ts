export interface IPerformanceConfig {
  cacheTime: number; // Time in ms that the app will maintain data in local storage
  refreshTime: number; // Time between refreshes of blockchain reads
}

const DEFAULT_CACHE_TIME = 60000;
const DEFAULT_REFRESH_TIME = 30000;

export const performanceConfig: IPerformanceConfig = {
  cacheTime: Number(import.meta.env.CACHE_TIME) || DEFAULT_CACHE_TIME,
  refreshTime:
    Number(import.meta.env.DEFAULT_REFRESH_TIME) || DEFAULT_REFRESH_TIME,
};
