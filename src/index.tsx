import * as React from 'react'
import { createApi } from 'unsplash-js'
import UnsplashImagePickerComponent from './component/unsplash-modal.component'

// export type UnSplashCreateAPI = typeof createApi
interface Props {
  unsplashAccessKey: string
  active?: boolean
  setActive?: (active: boolean) => void
}

export const UnsplashImagePicker = ({
  unsplashAccessKey,
  active = false,
  setActive = (_: any) => {}
}: Props) => {
  const unsplash = createApi({ accessKey: unsplashAccessKey })
  return (
    <UnsplashImagePickerComponent
      unsplash={unsplash}
      active={active}
      setActive={setActive}
    />
  )
}
