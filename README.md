# unsplash-image-picker

Provide component to search and choose image from unsplash images

[![npm](https://img.shields.io/npm/v/unsplash-image-picker?color=brightgreen)](https://www.npmjs.com/package/unsplash-image-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FTheAlphamerc%2Funsplash-image-picker&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## Live Demo

[Live Demo](https://thealphamerc.github.io/unsplash-image-picker/) [Code Sandbox](https://codesandbox.io/s/unsplash-image-picker-example-c7jzs1?file=/src/App.js)

## Install

```bash
npm install --save unsplash-image-picker
```

## Usage

Package provide 2 component to search and choose image from unsplash images.

- `UnsplashImagePicker` - search and choose image from unsplash images
- `UnsplashImagePickerModal` - Display modal to search and choose image from unsplash images

### How to use UnsplashImagePickerModal

```tsx
import React, { Component } from 'react'
import UnsplashImagePickerModal from 'unsplash-image-picker'
import 'unsplash-image-picker/dist/index.css'

const App = () => {
  const [active, setActive] = React.useState(false)
  const unsplashAccessKey = 'UNSPLASH_ACCESS_KEY'
  const [photos, SetPhotos] = React.useState([])
  return (
    <div>
      <button
        onClick={() => {
          setActive(true)
        }}
      >
        Show Picker
      </button>
      <UnsplashImagePickerModal
        unsplashAccessKey={unsplashAccessKey}
        active={active}
        setActive={setActive}
        initialPhotoSearchQuery=''
        onPhotoSelect={(photo) => {
          let list = photos ?? []
          list.push(photo)
          SetPhotos(list)
          setActive(false)
        }}
      />
    </div>
  )
}
```

### How to use UnSplashImagePicker

```tsx
import React from 'react'
import 'unsplash-image-picker/dist/index.css'
import { UnSplashImagePicker } from 'unsplash-image-picker'

const App = () => {
  const [photos, setPhotos] = React.useState([])
  const unsplashAccessKey = 'UNSPLASH_ACCESS_KEY'
  return (
    <div className='App '>
      <UnSplashImagePicker
        unsplashAccessKey={unsplashAccessKey}
        initialPhotoSearchQuery=''
        onPhotoSelect={(photo) => {
          let list = photos ?? []
          list.push(photo)
          SetPhotos(list)
        }}
      />
    </div>
  )
}

export default App
```

> To get UNSPLASH ACCESS KEY, you can register at [unsplash.com](https://unsplash.com/join)

## License

MIT © [thealphamerc](https://github.com/thealphamerc)
