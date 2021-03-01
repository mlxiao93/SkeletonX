import React from 'react'

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