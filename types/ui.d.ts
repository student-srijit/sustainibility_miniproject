declare module '@/components/ui/button' {
  import { ComponentProps } from 'react'
  
  export interface ButtonProps extends ComponentProps<'button'> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    asChild?: boolean
  }
  
  export const Button: (props: ButtonProps) => JSX.Element
}
