import fetchable from './fetchable';
import { UrlValidator } from "./html";
export * from './fetchable';

export const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  .replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : r & 0x3 | 0x8).toString(16)
  });

export const retryFetch = async (url: string, timeout: number, retry: number, log: typeof console.log, options?: {
  headers?: Record<string, string>,
  urlValidator?: UrlValidator
}) => {
  if (options?.urlValidator?.(url)) {
    throw new Error(`\`${url}\` failed URL validation. Skipping...`);
  }
  for (let i = 0; i < retry - 1; i++) {
    try {
      return await fetchable(url, timeout, {
        headers: options?.headers,
      });
    } catch {
      log(`Failed to fetch \`${url}\` ${i + 1} ${i === 0 ? 'time' : 'times'}. Retrying...`);
    }
  }
  // last try, no catching
  return fetchable(url, timeout, {
    headers: options?.headers,
  });
}