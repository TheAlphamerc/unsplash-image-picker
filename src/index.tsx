import * as React from 'react'
import { createApi } from 'unsplash-js'
import ImagePicker from './component/image-picker.component'

// export type UnSplashCreateAPI = typeof createApi
interface Props {
  unsplashAccessKey: string
  active?: boolean
  initialPhotoSearchQuery?: string
  setActive?: (active: boolean) => void
}

export const UnsplashImagePicker = ({
  unsplashAccessKey,
  active = false,
  initialPhotoSearchQuery,
  setActive = (_: any) => {}
}: Props) => {
  const unsplash = createApi({ accessKey: unsplashAccessKey })
  return (
    <ImagePicker
      active={active}
      setActive={setActive}
      unsplash={unsplash}
      initialPhotoSearchQuery={initialPhotoSearchQuery}
    />
  )
}
