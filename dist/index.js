function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var unsplashJs = require('unsplash-js');
var cx = _interopDefault(require('classnames'));

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["children", "className", "width", "padding", "active", "setActive"];
function Modal(_ref) {
  var children = _ref.children,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 540 : _ref$width,
      _ref$padding = _ref.padding,
      padding = _ref$padding === void 0 ? true : _ref$padding,
      _ref$active = _ref.active,
      active = _ref$active === void 0 ? false : _ref$active,
      _ref$setActive = _ref.setActive,
      setActive = _ref$setActive === void 0 ? function (_e) {} : _ref$setActive,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  return React__default.createElement("div", Object.assign({
    onClick: function onClick(_e) {
      if (active) {
        setActive(false);
      } else {
        setActive(true);
      }
    },
    onKeyUp: function onKeyUp(e) {
      if (e.key === 'Escape') {
        setActive(false);
      }
    },
    className: cx("Modal", {
      active: active
    })
  }, props), React__default.createElement(Card, {
    onClick: function onClick(e) {
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

function Card(_ref2) {
  var children = _ref2.children,
      _ref2$padding = _ref2.padding,
      padding = _ref2$padding === void 0 ? true : _ref2$padding,
      _ref2$style = _ref2.style,
      style = _ref2$style === void 0 ? {} : _ref2$style,
      _ref2$onClick = _ref2.onClick,
      onClick = _ref2$onClick === void 0 ? function (_) {} : _ref2$onClick;
  return React__default.createElement("div", {
    onClick: onClick,
    style: style,
    className: cx('Card rounded shadow bg-white mx-auto my-auto', {
      'p-4': padding
    })
  }, children);
}

function UnsplashPhotoCard(_ref) {
  var photo = _ref.photo,
      _ref$onPhotoSelect = _ref.onPhotoSelect,
      onPhotoSelect = _ref$onPhotoSelect === void 0 ? function (_) {} : _ref$onPhotoSelect;
  return React__default.createElement("div", {
    className: 'group relative h-60 sm:h-44 md:h-32 w-full place-items-center object-cover cursor-pointer border theme-border-default',
    key: photo.id,
    onClick: function onClick() {
      return onPhotoSelect(photo);
    }
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

function PhotoList(_ref) {
  var _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
      _ref$isLoadingMore = _ref.isLoadingMore,
      isLoadingMore = _ref$isLoadingMore === void 0 ? false : _ref$isLoadingMore,
      photoList = _ref.photoList,
      total = _ref.total,
      onPhotoSelect = _ref.onPhotoSelect,
      loadMore = _ref.loadMore;
  var listHeight = '700px';
  var ref = React__default.useMemo(function () {
    return React__default.createRef();
  }, []);

  var onScroll = function onScroll() {
    if (ref.current) {
      var _ref$current = ref.current,
          scrollTop = _ref$current.scrollTop,
          scrollHeight = _ref$current.scrollHeight,
          clientHeight = _ref$current.clientHeight;

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
  }, photoList.map(function (photo) {
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

function SearchBar(_ref) {
  var setQuery = _ref.setQuery,
      query = _ref.query,
      onSearch = _ref.onSearch;

  var searchPhotos = function searchPhotos(e) {
    try {
      e.preventDefault();
      onSearch(query);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
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
    onChange: function onChange(e) {
      return setQuery(e.target.value);
    }
  })), React__default.createElement("span", null, React__default.createElement("button", {
    className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md',
    type: 'submit'
  }, "Search")))));
}

function ImagePicker(_ref) {
  var unsplash = _ref.unsplash,
      _ref$active = _ref.active,
      active = _ref$active === void 0 ? false : _ref$active,
      _ref$initialPhotoSear = _ref.initialPhotoSearchQuery,
      initialPhotoSearchQuery = _ref$initialPhotoSear === void 0 ? '' : _ref$initialPhotoSear,
      _ref$setActive = _ref.setActive,
      setActive = _ref$setActive === void 0 ? function (_) {} : _ref$setActive,
      _ref$onPhotoSelect = _ref.onPhotoSelect,
      _onPhotoSelect = _ref$onPhotoSelect === void 0 ? function (_) {} : _ref$onPhotoSelect;

  if (!active) {
    return null;
  }

  var _React$useState = React__default.useState([]),
      pics = _React$useState[0],
      setPics = _React$useState[1];

  var _React$useState2 = React__default.useState(),
      total = _React$useState2[0],
      setTotal = _React$useState2[1];

  var _React$useState3 = React__default.useState(''),
      query = _React$useState3[0],
      setQuery = _React$useState3[1];

  var _React$useState4 = React__default.useState(false),
      isLoading = _React$useState4[0],
      setIsLoading = _React$useState4[1];

  var _React$useState5 = React__default.useState(false),
      isLoadingMore = _React$useState5[0],
      setIsLoadingMore = _React$useState5[1];

  var _React$useState6 = React__default.useState(1),
      page = _React$useState6[0],
      setPage = _React$useState6[1];

  React__default.useEffect(function () {
    if (initialPhotoSearchQuery !== '') {
      setQuery(initialPhotoSearchQuery);
      fetchPhotos(1, initialPhotoSearchQuery);
    } else {
      setTotal(0);
    }
  }, [initialPhotoSearchQuery]);

  var fetchPhotos = function fetchPhotos(page, text, reset) {
    if (reset === void 0) {
      reset = false;
    }

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
    }).then(function (response) {
      var _response$response;

      var newPics = response === null || response === void 0 ? void 0 : (_response$response = response.response) === null || _response$response === void 0 ? void 0 : _response$response.results;

      if (newPics) {
        var mergedPics = newPics;

        if (!reset) {
          mergedPics = [].concat(pics, newPics);
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
    onSearch: function onSearch(query) {
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
    loadMore: function loadMore() {
      fetchPhotos(page + 1, query);
    },
    onPhotoSelect: function (photo) {
      try {
        try {
          _onPhotoSelect(photo);
        } catch (error) {
          console.log(error);
        }

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }))));
}

var UnsplashImagePicker = function UnsplashImagePicker(_ref) {
  var unsplashAccessKey = _ref.unsplashAccessKey,
      _ref$active = _ref.active,
      active = _ref$active === void 0 ? false : _ref$active,
      initialPhotoSearchQuery = _ref.initialPhotoSearchQuery,
      _ref$setActive = _ref.setActive,
      setActive = _ref$setActive === void 0 ? function (_) {} : _ref$setActive;
  var unsplash = unsplashJs.createApi({
    accessKey: unsplashAccessKey
  });
  return React.createElement(ImagePicker, {
    active: active,
    setActive: setActive,
    unsplash: unsplash,
    initialPhotoSearchQuery: initialPhotoSearchQuery
  });
};

exports.UnsplashImagePicker = UnsplashImagePicker;
//# sourceMappingURL=index.js.map
