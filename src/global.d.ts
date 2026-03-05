declare module '*.module.scss' {
    const cl: { [key: string]: string }
    export default cl
}
declare module '*.svg?react' {
    import * as React from 'react'
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
    export default ReactComponent
}