import React from 'react';
import cx from 'classnames';
import { createApi } from 'unsplash-js';

function Modal({
  children,
  className = '',
  width = 540,
  padding = true,
  active = false,
  setActive = function (_e) {},
  ...props
}) {
  return React.createElement("div", Object.assign({
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
  }, props), React.createElement(Card, {
    onClick: e => {
      if (active) {
        e.stopPropagation();
      }
    },
    padding: padding,
    className: 'overflow-hidden h-full',
    style: {
      maxWidth: width,
      width: '100%'
    }
  }, children));
}

function Card({
  children,
  padding = true,
  className = '',
  style = {},
  onClick = _ => {}
}) {
  return React.createElement("div", {
    onClick: onClick,
    style: style,
    className: cx('Card rounded shadow bg-white mx-auto my-auto', {
      'p-4': padding
    })
  }, children);
}

function UnsplashPhotoCard({
  photo,
  onPhotoSelect = _ => {}
}) {
  return React.createElement("div", {
    className: 'group relative h-60 sm:h-44 md:h-32 w-full place-items-center object-cover cursor-pointer border theme-border-default',
    key: photo.id,
    onClick: () => onPhotoSelect(photo)
  }, React.createElement("img", {
    className: 'card-img place-items-center w-full object-cover h-full rounded',
    src: photo.urls.thumb,
    alt: photo.alt_description
  }), React.createElement("div", {
    className: 'absolute top-0 right-0 left-0 bottom-0 invisible group-hover:visible group-hover:bg-black/20',
    style: {
      color: 'white'
    }
  }, React.createElement("div", {
    className: 'flex space-x-1 items-center place-content-center justify-between m-2'
  }, React.createElement("div", {
    className: 'flex items-center space-x-1'
  }, React.createElement("img", {
    className: 'rounded-full h-6 w-6',
    src: photo.user.profile_image.small,
    alt: photo.user.username
  }), React.createElement("h6", {
    className: 'text-xs word-breaker'
  }, photo.user.name)))));
}

function PhotoList({
  isLoading = false,
  isLoadingMore = false,
  photoList,
  total,
  onPhotoSelect,
  loadMore
}) {
  const listHeight = '700px';
  const ref = React.useMemo(() => React.createRef(), []);

  const onScroll = () => {
    if (ref.current) {
      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = ref.current;

      if (scrollHeight - (scrollTop + clientHeight) < 20) {
        loadMore();
      }
    }
  };

  return React.createElement("div", {
    className: 'Body'
  }, isLoading ? React.createElement("div", {
    className: 'flex items-center justify-center h-96'
  }, React.createElement(Loader, null)) : React.createElement("div", null, Array.isArray(photoList) && photoList.length > 0 && React.createElement("div", {
    className: 'PhotoList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 overflow-y-auto p-4',
    style: {
      maxHeight: listHeight
    },
    ref: ref,
    onScroll: onScroll
  }, photoList.map(photo => {
    return React.createElement(UnsplashPhotoCard, {
      key: photo.id,
      photo: photo,
      onPhotoSelect: onPhotoSelect
    });
  })), Array.isArray(photoList) && photoList.length === 0 && total === 0 && React.createElement("div", {
    className: 'flex items-center justify-center h-96'
  }, "No photos found"), !total && React.createElement("div", {
    className: 'flex items-center justify-center h-96 text-gray-600'
  })), isLoadingMore && React.createElement("div", {
    className: 'my-4 flex justify-center'
  }, React.createElement(Loader, null)));
}

function Loader() {
  return React.createElement("svg", {
    className: 'animate-spin -ml-1 mr-3 h-5 w-5 text-blue',
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24'
  }, React.createElement("circle", {
    className: 'opacity-25',
    cx: '12',
    cy: '12',
    r: '10',
    stroke: 'currentColor',
    strokeWidth: '4'
  }), React.createElement("path", {
    className: 'opacity-75',
    fill: 'currentColor',
    d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
  }));
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

  return React.createElement("div", null, React.createElement("div", null, React.createElement("form", {
    onSubmit: searchPhotos,
    className: 'flex items-center space-x-2'
  }, React.createElement("label", {
    className: ' w-full'
  }, React.createElement("input", {
    className: 'placeholder:italic placeholder:theme-text-subtitle-1  w-full border theme-border-default rounded-md py-2 pl-3 pr-3  focus:outline-none focus:theme-border-primary  focus:ring-1 sm:text-sm',
    placeholder: 'Search for an image',
    type: 'text',
    name: 'search',
    value: query,
    onChange: e => setQuery(e.target.value)
  })), React.createElement("span", null, React.createElement("button", {
    className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md',
    type: 'submit'
  }, "Search")))));
}

function ImagePicker({
  unsplashAccessKey,
  initialPhotoSearchQuery = '',
  onPhotoSelect = _ => {}
}) {
  const [pics, setPics] = React.useState([]);
  const [total, setTotal] = React.useState();
  const [query, setQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const unsplash = createApi({
    accessKey: unsplashAccessKey
  });
  React.useEffect(() => {
    if (initialPhotoSearchQuery !== '') {
      setQuery(initialPhotoSearchQuery);
      fetchPhotos(1, initialPhotoSearchQuery);
    }
  }, []);

  const fetchPhotos = (page, text, reset = false) => {
    if (isLoading || isLoadingMore) {
      return;
    }

    if (page === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    setPage(page);
    unsplash.search.getPhotos({
      page: page,
      perPage: 30,
      query: text,
      orientation: 'landscape'
    }).then(response => {
      var _response$response;

      const newPics = response === null || response === void 0 ? void 0 : (_response$response = response.response) === null || _response$response === void 0 ? void 0 : _response$response.results;

      if (newPics) {
        let mergedPics = newPics;

        if (!reset) {
          mergedPics = [...pics, ...newPics];
        }

        setPics(mergedPics);
        setTotal(response.response.total);
      }

      setIsLoading(false);
      setIsLoadingMore(false);
    });
  };

  return React.createElement("div", {
    className: 'ImagePicker items-center bg-white rounded'
  }, React.createElement("div", {
    className: 'bg-white '
  }, React.createElement("div", {
    className: 'Picker relative h-full rounded'
  }, React.createElement("div", {
    className: 'px-4 pt-4 font-bold text-lg bg-white'
  }, ' ', "Search image"), React.createElement("div", {
    className: 'shadow p-4 bg-white'
  }, React.createElement("div", {
    className: ''
  }, React.createElement(SearchBar, {
    onSearch: query => {
      setPics([]);
      fetchPhotos(1, query, true);
    },
    query: query,
    setQuery: setQuery
  }))), React.createElement(PhotoList, {
    total: total,
    photoList: pics,
    isLoading: isLoading,
    isLoadingMore: isLoadingMore,
    loadMore: () => {
      fetchPhotos(page + 1, query);
    },
    onPhotoSelect: async photo => {
      try {
        onPhotoSelect(photo);
      } catch (error) {
        console.log(error);
      }
    }
  }))));
}

function ImagePickerModal({
  unsplashAccessKey,
  active = false,
  initialPhotoSearchQuery = '',
  setActive = _ => {},
  onPhotoSelect = _ => {},
  modalWidth = 840,
  modalClassName = ''
}) {
  if (!active) {
    return null;
  }

  return React.createElement("div", {
    className: ''
  }, React.createElement(Modal, {
    active: active,
    setActive: setActive,
    width: `${modalWidth}px`,
    padding: false,
    className: modalClassName
  }, React.createElement(ImagePicker, {
    unsplashAccessKey: unsplashAccessKey,
    initialPhotoSearchQuery: initialPhotoSearchQuery,
    onPhotoSelect: onPhotoSelect
  })));
}

export default ImagePickerModal;
export { ImagePicker as UnSplashImagePicker };
//# sourceMappingURL=index.modern.js.map
