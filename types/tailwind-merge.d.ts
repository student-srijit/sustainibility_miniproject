declare module 'tailwind-merge' {
  export function twMerge(...classLists: (string | undefined | null | false)[]): string;
}

declare module 'clsx' {
  export type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | false;
  interface ClassDictionary {
    [id: string]: boolean | undefined | null;
  }
  interface ClassArray extends Array<ClassValue> {}
  export function clsx(...inputs: ClassValue[]): string;
}
