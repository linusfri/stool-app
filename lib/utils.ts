import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getBaseUrl } from './api/utils';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prettyPrint(obj: unknown) {
  console.log(JSON.stringify(obj, null, 2));
}

export function getFileUrl(relativeFileUrl: string) {
  return `${getBaseUrl()}/${relativeFileUrl}`;
}

export function formatItemPrice(price: number) {
  switch (process.env.EXPO_PUBLIC_LOCALE) {
    case 'sv-SE':
      return `${price.toFixed(2)} kr`;
    default:
      return `${price.toFixed(2)} kr`;
  }
}