import React from 'react'

interface Props {
  query: string
  setQuery: (query: string) => void
  onSearch: (query: string) => void
}
function SearchBar({ setQuery, query, onSearch }: Props) {
  const searchPhotos = async (e: any) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <div>
      <div>
        <form onSubmit={searchPhotos} className='flex items-center space-x-2'>
          <label className=' w-full'>
            <input
              className='placeholder:italic placeholder:theme-text-subtitle-1  w-full border theme-border-default rounded-md py-2 pl-3 pr-3  focus:outline-none focus:theme-border-primary  focus:ring-1 sm:text-sm'
              placeholder='Search for an image'
              type='text'
              name='search'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <span>
            {/* <Button label={'Search'} onClick={searchPhotos} /> */}
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'
              type='submit'
            >
              Search
            </button>
          </span>
        </form>
      </div>
    </div>
  )
}

export default SearchBar
