interface Window {
  __skeleton__x__lib: {
    getData: () => string | undefined,
    renderToHtml: (renderString?: string, moduleId?: string) => string,
    getModuleSize: (renderString?: string, moduleId?: string) => {height: string}
  }
}

declare module 'skeletonx/lib/react' {
  export const SkeletonContainer: React.FC<{
    children?: React.ReactNode
    moduleId?: string
    showSkeleton?: boolean
    className?: string
    style?: React.CSSProperties
  }>
  export const SkeletonSupspense: React.FC<{
    moduleId: string,
    style?: React.CSSProperties
  }>
}