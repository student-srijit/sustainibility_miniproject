declare module 'lucide-react' {
  import { ComponentProps } from 'react'
  
  export interface IconProps extends ComponentProps<'svg'> {
    size?: number | string
    color?: string
    strokeWidth?: number | string
  }
  
  export const Menu: (props: IconProps) => JSX.Element
  export const X: (props: IconProps) => JSX.Element
  export const Leaf: (props: IconProps) => JSX.Element
  export const User: (props: IconProps) => JSX.Element
  export const LogOut: (props: IconProps) => JSX.Element
}
