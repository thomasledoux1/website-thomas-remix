import type {ComponentPropsWithoutRef} from 'react'

export function OptimizedImage({
  optimizerUrl = '/resources/image',
  responsive,
  src,
  ...rest
}: ComponentPropsWithoutRef<'img'> & {
  optimizerUrl?: string
  responsive?: {
    maxWidth?: number
    size: {width: number; height?: number}
  }[]
}) {
  const url = src ? `${optimizerUrl}?src=${encodeURIComponent(src)}` : src

  const props: ComponentPropsWithoutRef<'img'> = {
    src: `${url}&width=${rest.width || ''}&height=${rest.height || ''}`,
  }

  let largestImageWidth = 0
  let largestImageSrc: string | undefined
  if (responsive && responsive.length) {
    let srcSet = ''
    let sizes = ''
    // eslint-disable-next-line no-restricted-syntax
    for (const {maxWidth, size} of responsive) {
      if (srcSet) {
        srcSet += ', '
      }
      const srcSetUrl = `${url}&width=${size.width}&height=${
        size.height || ''
      } ${size.width}w`
      srcSet += srcSetUrl

      if (maxWidth) {
        if (sizes) {
          sizes += ', '
        }
        sizes += `(max-width: ${maxWidth}px) ${size.width}px`
      }

      if (size.width > largestImageWidth) {
        largestImageWidth = size.width
        largestImageSrc = srcSetUrl
      }
    }
    props.srcSet = srcSet
    props.sizes = sizes
    props.src = ''
  }

  if (largestImageSrc && (!rest.width || largestImageWidth > rest.width)) {
    props.src = largestImageSrc
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...rest} {...props} />
}
