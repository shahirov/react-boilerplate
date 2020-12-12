/* IMAGES */
declare module '*.avif' {
  const ref: string
  export default ref
}

declare module '*.bmp' {
  const ref: string
  export default ref
}

declare module '*.gif' {
  const ref: string
  export default ref
}

declare module '*.jpg' {
  const ref: string
  export default ref
}

declare module '*.jpeg' {
  const ref: string
  export default ref
}

declare module '*.png' {
  const ref: string
  export default ref
}

declare module '*.webp' {
  const ref: string
  export default ref
}

declare module '*.svg' {
  import { FunctionComponent } from 'react'

  const Component: FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  export default Component
}
