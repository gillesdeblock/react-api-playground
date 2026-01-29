import { v4 as uuid } from 'uuid'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function withID<T extends Record<any, any>>(obj: T) {
  return { ...obj, id: uuid() }
}
