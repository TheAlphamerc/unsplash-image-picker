# unsplash-image-picker

> Provide component to search and choose image from unsplash images

[![NPM](https://img.shields.io/npm/v/unsplash-image-picker.svg)](https://www.npmjs.com/package/unsplash-image-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FTheAlphamerc%2Funsplash-image-picker&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## Install

```bash
npm install --save unsplash-image-picker
```

## Usage

```tsx
import React, { Component } from 'react'

import { UnsplashImagePicker } from 'unsplash-image-picker'
import 'unsplash-image-picker/dist/index.css'

const App = () => {
  const [active, setActive] = React.useState(false)
  const unsplashAccessKey = 'dTUBUnPASfrsKOWYzVpAwvkr9Ks2MuY3i5YCvSqAxWQ'
  return (
    <div>
      <button
        onClick={() => {
          setActive(true)
        }}>
        Show Picker
      </button>
      <UnsplashImagePicker
        unsplashAccessKey={unsplashAccessKey}
        active={active}
        setActive={setActive}
      />
    </div>
  )
}
```

## License

MIT © [thealphamerc](https://github.com/thealphamerc)
