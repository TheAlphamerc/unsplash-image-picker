import React from 'react'

import { UnsplashImagePicker } from 'unsplash-image-picker'
import 'unsplash-image-picker/dist/index.css'

const App = () => {
  const [active, setActive] = React.useState(false)
  const unsplashAccessKey = 'dTUBUnPASfrsKOWYzVpAwvkr9Ks2MuY3i5YCvSqAxWQ'
  return (
    <div className='App flex items-center justify-center'>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-42'
        onClick={() => {
          setActive(true)
        }}
      >
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

export default App
