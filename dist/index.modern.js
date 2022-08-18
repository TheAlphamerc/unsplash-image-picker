import React__default, { createElement } from 'react';
import { createApi } from 'unsplash-js';
import cx from 'classnames';

function Modal({
  children,
  className = '',
  width = 540,
  padding = true,
  active = false,
  setActive = function (_e) {},
  ...props
}) {
  return React__default.createElement("div", Object.assign({
    onClick: _e => {
      if (active) {
        setActive(false);
      } else {
        setActive(true);
      }
    },
    onKeyUp: e => {
      if (e.key === 'Escape') {
        setActive(false);
      }
    },
    className: cx(`Modal`, {
      active: active
    })
  }, props), React__default.createElement("div", {
    className: 'flex',
    style: {
      maxHeight: '90vh'
    }
  }, React__default.createElement(Card, {
    onClick: e => {
      if (active) {
        e.stopPropagation();
      }
    },
    padding: padding,
    className: `overflow-hidden `,
    style: {
      maxWidth: width,
      width: '100%'
    }
  }, children)));
}

function Card({
  children,
  padding = true,
  className = '',
  style = {},
  onClick = _ => {}
}) {
  return React__default.createElement("div", {
    onClick: onClick,
    style: style,
    className: cx('Card rounded shadow bg-white mx-auto my-auto', {
      'p-4': padding
    })
  }, children);
}

function PhotoList({
  isLoading = false,
  photoList,
  onPhotoSelect,
  loadMore
}) {
  return React__default.createElement("div", {
    className: ''
  }, React__default.createElement(InfiniteScroll, {
    pageStart: 0,
    loadMore: loadMore,
    loader: React__default.createElement("p", {
      key: '0'
    }, "Loading more photos...")
  }, isLoading ? React__default.createElement("div", {
    className: 'flex items-center justify-center h-96'
  }, "Loading photos") : React__default.createElement("div", {
    className: 'card-columns mt-4'
  }, photoList && photoList.map(pic => {
    return React__default.createElement("div", {
      className: 'group relative card border-0 mb-2 cursor-pointer',
      key: pic.id,
      onClick: () => onPhotoSelect(pic)
    }, React__default.createElement("img", {
      className: 'card-img',
      src: pic.urls.small,
      alt: pic.alt_description
    }), React__default.createElement("div", {
      className: 'absolute top-2 right-1 left-1 invisible group-hover:visible ',
      style: {
        color: 'white'
      }
    }, React__default.createElement("div", {
      className: 'flex items-center justify-between'
    }, React__default.createElement("div", {
      className: 'flex items-center space-x-1'
    }, React__default.createElement("img", {
      className: 'rounded-full h-6 w-6',
      src: pic.user.profile_image.small,
      alt: pic.user.username
    }), React__default.createElement("h6", {
      className: 'text-xs'
    }, pic.user.name)))));
  })), photoList && photoList.length === 0 && React__default.createElement("div", {
    className: 'h-96'
  })));
}

function InfiniteScroll({
  pageStart,
  loadMore,
  loader,
  children
}) {
  const [isLoading, setIsLoading] = React__default.useState(false);
  const [page, setPage] = React__default.useState(pageStart);
  React__default.useEffect(() => {
    const callBack = () => {
      if (window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight) {
        console.log('load more');

        if (!isLoading) {
          loadMore(page + 1);
        }
      }
    };

    window.addEventListener('scroll', callBack);
    return () => {
      window.removeEventListener('scroll', callBack);
    };
  }, [pageStart]);
  return React__default.createElement("div", null, children, isLoading && loader);
}

function SearchBar({
  setQuery,
  query,
  onSearch
}) {
  const searchPhotos = async e => {
    e.preventDefault();
    onSearch(query);
  };

  return React__default.createElement("div", null, React__default.createElement("div", null, React__default.createElement("form", {
    onSubmit: searchPhotos,
    className: 'flex items-center space-x-2'
  }, React__default.createElement("label", {
    className: ' w-full'
  }, React__default.createElement("input", {
    className: 'placeholder:italic placeholder:theme-text-subtitle-1  w-full border theme-border-default rounded-md py-2 pl-3 pr-3  focus:outline-none focus:theme-border-primary  focus:ring-1 sm:text-sm',
    placeholder: 'Search for an image',
    type: 'text',
    name: 'search',
    value: query,
    onChange: e => setQuery(e.target.value)
  })), React__default.createElement("span", null, React__default.createElement("button", {
    className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md',
    type: 'submit'
  }, "Search")))));
}

function UnsplashImagePickerComponent({
  unsplash,
  active = false,
  setActive = _ => {}
}) {
  const [pics, setPics] = React__default.useState([]);
  const [query, setQuery] = React__default.useState('');
  const [isLoading, setIsLoading] = React__default.useState(false);
  React__default.useEffect(() => {
    fetchPhotos(1, query);
  }, []);

  const fetchPhotos = (page, query) => {
    setIsLoading(true);
    unsplash.search.getPhotos({
      page: page,
      perPage: 15,
      query: query
    }).then(response => {
      var _response$response;

      const newPics = response === null || response === void 0 ? void 0 : (_response$response = response.response) === null || _response$response === void 0 ? void 0 : _response$response.results;

      if (newPics) {
        setPics(newPics);
      }

      setIsLoading(false);
    });
  };

  return React__default.createElement("div", {
    className: 'UnsplashImagePickerComponent theme-bg-surface p-4 rounded'
  }, React__default.createElement(Modal, {
    active: active,
    setActive: setActive,
    width: '840px',
    padding: false,
    className: 'theme-bg-surface'
  }, React__default.createElement("div", null, React__default.createElement("div", {
    className: 'px-4 pt-4 font-bold text-lg theme-bg-surface'
  }, ' ', "Search image"), React__default.createElement("div", {
    className: 'shadow p-4 theme-bg-surface'
  }, React__default.createElement("div", {
    className: ''
  }, React__default.createElement(SearchBar, {
    onSearch: query => {
      console.log(query);
      setPics([]);
      fetchPhotos(1, query);
    },
    query: query,
    setQuery: setQuery
  }))), React__default.createElement("div", {
    className: 'p-4 overflow-y-auto',
    style: {
      maxHeight: '600px'
    }
  }, React__default.createElement(PhotoList, {
    photoList: pics,
    isLoading: isLoading,
    loadMore: fetchPhotos,
    onPhotoSelect: photo => {
      console.log('photo', photo);
    }
  })))));
}

const UnsplashImagePicker = ({
  unsplashAccessKey,
  active: _active = false,
  setActive: _setActive = _ => {}
}) => {
  const unsplash = createApi({
    accessKey: unsplashAccessKey
  });
  return createElement(UnsplashImagePickerComponent, {
    unsplash: unsplash,
    active: _active,
    setActive: _setActive
  });
};

export { UnsplashImagePicker };
//# sourceMappingURL=index.modern.js.map
