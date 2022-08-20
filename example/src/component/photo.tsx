import React from 'react'

export default function Photo({ photo }: any) {
  console.log(photo)
  return (
    <img
      src={photo.urls.regular}
      alt={photo.alt_description}
      className='sm:h-72 sm:w-full lg:h-52 object-cover rounded border  shadow-md'
    />
  )
}
