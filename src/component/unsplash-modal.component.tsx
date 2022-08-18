import React from 'react'
import Modal from './modal'
import PhotoList from './photo-list.component'
import SearchBar from './search-bar.component'
interface Props {
  unsplash: any
  active?: boolean
  setActive?: (active: boolean) => void
}

export default function UnsplashImagePickerComponent({
  unsplash,
  active = false,
  setActive = (_: boolean) => {}
}: Props) {
  const [pics, setPics] = React.useState<any[]>([])
  const [query, setQuery] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    fetchPhotos(1, query)
  }, [])

  const fetchPhotos = (page: number, query: string) => {
    setIsLoading(true)
    unsplash.search
      .getPhotos({
        page: page,
        perPage: 15,
        query: query
      })
      .then((response: any) => {
        const newPics = response?.response?.results
        if (newPics) {
          setPics(newPics)
        }
        setIsLoading(false)
      })
  }

  return (
    <div className='UnsplashImagePickerComponent theme-bg-surface p-4 rounded'>
      <Modal
        active={active}
        setActive={setActive}
        width='840px'
        padding={false}
        className='theme-bg-surface'
      >
        <div>
          <div className='px-4 pt-4 font-bold text-lg theme-bg-surface'>
            {' '}
            Search image
          </div>
          <div className='shadow p-4 theme-bg-surface'>
            <div className=''>
              <SearchBar
                onSearch={(query: string) => {
                  console.log(query)
                  setPics([])
                  fetchPhotos(1, query)
                }}
                query={query}
                setQuery={setQuery}
              />
            </div>
          </div>
          <div className='p-4 overflow-y-auto' style={{ maxHeight: '600px' }}>
            <PhotoList
              photoList={pics}
              isLoading={isLoading}
              loadMore={fetchPhotos}
              onPhotoSelect={(photo) => {
                console.log('photo', photo)
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
