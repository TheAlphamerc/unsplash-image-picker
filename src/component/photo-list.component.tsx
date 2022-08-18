import React from 'react'

interface Props {
  isLoading?: boolean
  photoList: Array<any>
  onPhotoSelect: (photo: any) => void
  loadMore: (page: number, query: string) => void
}
function PhotoList({
  isLoading = false,
  photoList,
  onPhotoSelect,
  loadMore
}: Props) {
  return (
    <div className=''>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        loader={<p key='0'>Loading more photos...</p>}
      >
        {isLoading ? (
          <div className='flex items-center justify-center h-96'>
            Loading photos
          </div>
        ) : (
          <div className='card-columns mt-4'>
            {photoList &&
              photoList.map((pic: any) => {
                return (
                  <div
                    className='group relative card border-0 mb-2 cursor-pointer'
                    key={pic.id}
                    onClick={() => onPhotoSelect(pic)}
                  >
                    <img
                      className='card-img'
                      src={pic.urls.small}
                      alt={pic.alt_description}
                    />
                    <div
                      className='absolute top-2 right-1 left-1 invisible group-hover:visible '
                      style={{ color: 'white' }}
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-1'>
                          <img
                            className='rounded-full h-6 w-6'
                            src={pic.user.profile_image.small}
                            alt={pic.user.username}
                          />
                          <h6 className='text-xs'>{pic.user.name}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        )}
        {photoList && photoList.length === 0 && <div className='h-96' />}
      </InfiniteScroll>
    </div>
  )
}

/**
 * Infinite scroll component
 */
function InfiniteScroll({ pageStart, loadMore, loader, children }: any) {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = React.useState(pageStart)
  React.useEffect(() => {
    const callBack = () => {
      if (
        window.innerHeight + window.scrollY + 100 >=
        document.body.offsetHeight
      ) {
        console.log('load more')
        if (!isLoading) {
          // loadMoreItems();
          loadMore(page + 1)
        }
      }
    }
    window.addEventListener('scroll', callBack)
    return () => {
      window.removeEventListener('scroll', callBack)
    }
  }, [pageStart])

  return (
    <div>
      {children}
      {isLoading && loader}
    </div>
  )
}

export default PhotoList
