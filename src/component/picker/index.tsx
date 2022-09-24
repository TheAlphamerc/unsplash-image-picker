import React from 'react'
import { createApi } from 'unsplash-js'
import PhotoList from './photo-list.component'
import SearchBar from './search-bar.component'

interface Props {
  unsplashAccessKey: string
  initialPhotoSearchQuery?: string
  onPhotoSelect?: (photo: any) => void
}

/**
 * @description ImagePicker search image from Unsplash.
 * @param {string} unsplashAccessKey - The unsplash access key.
 * @param {string} initialPhotoSearchQuery - The initial search query.
 * @param {function} onPhotoSelect - Function to call when a photo is selected.
 */
export default function ImagePicker({
  unsplashAccessKey,
  initialPhotoSearchQuery = '',
  onPhotoSelect = (_: any) => {}
}: Props) {
  const [pics, setPics] = React.useState<any[]>([])
  const [total, setTotal] = React.useState<number | undefined>()
  const [query, setQuery] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoadingMore, setIsLoadingMore] = React.useState(false)
  const [page, setPage] = React.useState(1)

  const unsplash = createApi({ accessKey: unsplashAccessKey })

  React.useEffect(() => {
    if (initialPhotoSearchQuery !== '') {
      setQuery(initialPhotoSearchQuery)
      fetchPhotos(1, initialPhotoSearchQuery)
    }
  }, [])

  const fetchPhotos = (page: number, text: string, reset = false) => {
    if (isLoading || isLoadingMore) {
      return
    }
    if (page === 1) {
      setIsLoading(true)
    } else {
      setIsLoadingMore(true)
    }
    setPage(page)
    unsplash.search
      .getPhotos({
        page: page,
        perPage: 30,
        query: text,
        orientation: 'landscape'
      })
      .then((response: any) => {
        const newPics = response?.response?.results
        if (newPics) {
          let mergedPics = newPics
          if (!reset) {
            mergedPics = [...pics, ...newPics]
          }
          setPics(mergedPics)
          setTotal(response.response.total)
        }
        setIsLoading(false)
        setIsLoadingMore(false)
      })
  }

  return (
    <div className='ImagePicker items-center bg-white rounded'>
      <div className='bg-white '>
        <div className='Picker relative h-full rounded'>
          <div className='px-4 pt-4 font-bold text-lg bg-white '>
            {' '}
            Search image
          </div>
          <div className='shadow p-4 bg-white'>
            <div className=''>
              <SearchBar
                onSearch={(query: string) => {
                  setPics([])
                  fetchPhotos(1, query, true)
                }}
                query={query}
                setQuery={setQuery}
              />
            </div>
          </div>

          <PhotoList
            total={total}
            photoList={pics}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            loadMore={() => {
              fetchPhotos(page + 1, query)
            }}
            onPhotoSelect={async (photo: any) => {
              try {
                // let blob = await fetch(photo.urls.regular).then((r) => r.blob())
                // let image = await URL.createObjectURL(blob)
                onPhotoSelect(photo)
              } catch (error) {
                console.log(error)
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
