import React from 'react'

/**
 * @description PhotoCard component for UnsplashImagePicker
 * @param {Object} photo - The photo to display.
 * @param {funtion} onPhotoSelect - Function to call when a photo is selected.
 */
export default function UnsplashPhotoCard({
  photo,
  onPhotoSelect = (_: any) => {}
}: any) {
  return (
    <div
      className='group relative h-60 sm:h-44 md:h-32 w-full place-items-center object-cover cursor-pointer border theme-border-default'
      key={photo.id}
      onClick={() => onPhotoSelect(photo)}
    >
      <img
        className='card-img place-items-center w-full object-cover h-full rounded'
        src={photo.urls.thumb}
        alt={photo.alt_description}
      />
      <div
        className='absolute top-0 right-0 left-0 bottom-0 invisible group-hover:visible group-hover:bg-black/20'
        style={{ color: 'white' }}
      >
        <div className='flex space-x-1 items-center place-content-center justify-between m-2'>
          <div className='flex items-center space-x-1'>
            <img
              className='rounded-full h-6 w-6'
              src={photo.user.profile_image.small}
              alt={photo.user.username}
            />
            <h6 className='text-xs word-breaker'>{photo.user.name}</h6>
          </div>
        </div>
      </div>
    </div>
  )
}
