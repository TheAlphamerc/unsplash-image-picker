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
  }, props), React__default.createElement(Card, {
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
  return React__default.createElement("div", {
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
  return React__default.createElement("div", {
    className: 'group relative h-60 sm:h-44 md:h-32 w-full place-items-center object-cover cursor-pointer border theme-border-default',
    key: photo.id,
    onClick: () => onPhotoSelect(photo)
  }, React__default.createElement("img", {
    className: 'card-img place-items-center w-full object-cover h-full rounded',
    src: photo.urls.thumb,
    alt: photo.alt_description
  }), React__default.createElement("div", {
    className: 'absolute top-0 right-0 left-0 bottom-0 invisible group-hover:visible group-hover:bg-black/20',
    style: {
      color: 'white'
    }
  }, React__default.createElement("div", {
    className: 'flex space-x-1 items-center place-content-center justify-between m-2'
  }, React__default.createElement("div", {
    className: 'flex items-center space-x-1'
  }, React__default.createElement("img", {
    className: 'rounded-full h-6 w-6',
    src: photo.user.profile_image.small,
    alt: photo.user.username
  }), React__default.createElement("h6", {
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
  const ref = React__default.useMemo(() => React__default.createRef(), []);

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

  return React__default.createElement("div", {
    className: 'Body'
  }, isLoading ? React__default.createElement("div", {
    className: 'flex items-center justify-center h-96'
  }, React__default.createElement(Loader, null)) : React__default.createElement("div", null, Array.isArray(photoList) && photoList.length > 0 && React__default.createElement("div", {
    className: 'PhotoList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 overflow-y-auto p-4',
    style: {
      maxHeight: listHeight
    },
    ref: ref,
    onScroll: onScroll
  }, photoList.map(photo => {
    return React__default.createElement(UnsplashPhotoCard, {
      key: photo.id,
      photo: photo,
      onPhotoSelect: onPhotoSelect
    });
  })), Array.isArray(photoList) && photoList.length === 0 && total === 0 && React__default.createElement("div", {
    className: 'flex items-center justify-center h-96'
  }, "No photos found")), isLoadingMore && React__default.createElement("div", {
    className: 'my-4 flex justify-center'
  }, React__default.createElement(Loader, null)));
}

function Loader() {
  return React__default.createElement("svg", {
    className: 'animate-spin -ml-1 mr-3 h-5 w-5 text-blue',
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24'
  }, React__default.createElement("circle", {
    className: 'opacity-25',
    cx: '12',
    cy: '12',
    r: '10',
    stroke: 'currentColor',
    strokeWidth: '4'
  }), React__default.createElement("path", {
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

function ImagePicker({
  unsplash,
  active = false,
  initialPhotoSearchQuery = '',
  setActive = _ => {},
  onPhotoSelect = _ => {}
}) {
  if (!active) {
    return null;
  }

  const [pics, setPics] = React__default.useState([]);
  const [total, setTotal] = React__default.useState();
  const [query, setQuery] = React__default.useState('');
  const [isLoading, setIsLoading] = React__default.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React__default.useState(false);
  const [page, setPage] = React__default.useState(1);
  React__default.useEffect(() => {
    if (initialPhotoSearchQuery !== '') {
      setQuery(initialPhotoSearchQuery);
      fetchPhotos(1, initialPhotoSearchQuery);
    } else {
      setTotal(0);
    }
  }, [initialPhotoSearchQuery]);

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

  return React__default.createElement("div", {
    className: 'ImagePicker flex items-center bg-white rounded'
  }, React__default.createElement(Modal, {
    active: active,
    setActive: setActive,
    width: '840px',
    padding: false,
    className: 'bg-white '
  }, React__default.createElement("div", {
    className: 'Picker relative h-full rounded'
  }, React__default.createElement("div", {
    className: 'px-4 pt-4 font-bold text-lg bg-white'
  }, ' ', "Search image"), React__default.createElement("div", {
    className: 'shadow p-4 bg-white'
  }, React__default.createElement("div", {
    className: ''
  }, React__default.createElement(SearchBar, {
    onSearch: query => {
      setPics([]);
      fetchPhotos(1, query, true);
    },
    query: query,
    setQuery: setQuery
  }))), React__default.createElement(PhotoList, {
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

const UnsplashImagePicker = ({
  unsplashAccessKey,
  active: _active = false,
  initialPhotoSearchQuery,
  setActive: _setActive = _ => {}
}) => {
  const unsplash = createApi({
    accessKey: unsplashAccessKey
  });
  return createElement(ImagePicker, {
    active: _active,
    setActive: _setActive,
    unsplash: unsplash,
    initialPhotoSearchQuery: initialPhotoSearchQuery
  });
};

export { UnsplashImagePicker };
//# sourceMappingURL=index.modern.js.map
