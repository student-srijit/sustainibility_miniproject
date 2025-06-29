declare module 'next/link' {
  import { ComponentProps, ReactNode } from 'react'
  
  export interface LinkProps extends ComponentProps<'a'> {
    href: string
    children: ReactNode
  }
  
  export default function Link(props: LinkProps): JSX.Element
}

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string) => void
    refresh: () => void
  }
}
