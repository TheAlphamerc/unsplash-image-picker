function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var cx = _interopDefault(require('classnames'));
var unsplashJs = require('unsplash-js');

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

  return React.createElement("div", Object.assign({
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
  }, props), React.createElement(Card, {
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
  return React.createElement("div", {
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
  return React.createElement("div", {
    className: 'group relative h-60 sm:h-44 md:h-32 w-full place-items-center object-cover cursor-pointer border theme-border-default',
    key: photo.id,
    onClick: function onClick() {
      return onPhotoSelect(photo);
    }
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
  var ref = React.useMemo(function () {
    return React.createRef();
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

  return React.createElement("div", {
    className: 'Body'
  }, isLoading ? React.createElement("div", {
    className: 'flex items-center justify-center h-96'
  }, React.createElement(Loader, null)) : React.createElement("div", null, Array.isArray(photoList) && photoList.length > 0 && React.createElement("div", {
    className: 'PhotoList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 overflow-y-auto p-4 pb-12',
    style: {
      maxHeight: listHeight
    },
    ref: ref,
    onScroll: onScroll
  }, photoList.map(function (photo) {
    return React.createElement(UnsplashPhotoCard, {
      key: photo.id,
      photo: photo,
      onPhotoSelect: onPhotoSelect
    });
  }), isLoadingMore && React.createElement("div", {
    className: 'sm:col-span-2 md:col-span-3 my-4 flex justify-center'
  }, React.createElement(Loader, null))), Array.isArray(photoList) && photoList.length === 0 && total === 0 && React.createElement("div", {
    className: 'flex items-center justify-center h-96'
  }, "No photos found"), !total && React.createElement("div", {
    className: 'flex items-center justify-center h-96 text-gray-600'
  })));
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
    onChange: function onChange(e) {
      return setQuery(e.target.value);
    }
  })), React.createElement("span", null, React.createElement("button", {
    className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md',
    type: 'submit'
  }, "Search")))));
}

function ImagePicker(_ref) {
  var unsplashAccessKey = _ref.unsplashAccessKey,
      _ref$initialPhotoSear = _ref.initialPhotoSearchQuery,
      initialPhotoSearchQuery = _ref$initialPhotoSear === void 0 ? '' : _ref$initialPhotoSear,
      _ref$onPhotoSelect = _ref.onPhotoSelect,
      _onPhotoSelect = _ref$onPhotoSelect === void 0 ? function (_) {} : _ref$onPhotoSelect;

  var _React$useState = React.useState([]),
      pics = _React$useState[0],
      setPics = _React$useState[1];

  var _React$useState2 = React.useState(),
      total = _React$useState2[0],
      setTotal = _React$useState2[1];

  var _React$useState3 = React.useState(''),
      query = _React$useState3[0],
      setQuery = _React$useState3[1];

  var _React$useState4 = React.useState(false),
      isLoading = _React$useState4[0],
      setIsLoading = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      isLoadingMore = _React$useState5[0],
      setIsLoadingMore = _React$useState5[1];

  var _React$useState6 = React.useState(1),
      page = _React$useState6[0],
      setPage = _React$useState6[1];

  var unsplash = unsplashJs.createApi({
    accessKey: unsplashAccessKey
  });
  React.useEffect(function () {
    if (initialPhotoSearchQuery !== '') {
      setQuery(initialPhotoSearchQuery);
      fetchPhotos(1, initialPhotoSearchQuery);
    }
  }, []);

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

  return React.createElement("div", {
    className: 'ImagePicker items-center bg-white rounded'
  }, React.createElement("div", {
    className: 'bg-white '
  }, React.createElement("div", {
    className: 'Picker relative h-full rounded'
  }, React.createElement("div", {
    className: 'px-4 pt-4 font-bold text-lg bg-white '
  }, ' ', "Search image"), React.createElement("div", {
    className: 'shadow p-4 bg-white'
  }, React.createElement("div", {
    className: ''
  }, React.createElement(SearchBar, {
    onSearch: function onSearch(query) {
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

function ImagePickerModal(_ref) {
  var unsplashAccessKey = _ref.unsplashAccessKey,
      _ref$active = _ref.active,
      active = _ref$active === void 0 ? false : _ref$active,
      _ref$initialPhotoSear = _ref.initialPhotoSearchQuery,
      initialPhotoSearchQuery = _ref$initialPhotoSear === void 0 ? '' : _ref$initialPhotoSear,
      _ref$setActive = _ref.setActive,
      setActive = _ref$setActive === void 0 ? function (_) {} : _ref$setActive,
      _ref$onPhotoSelect = _ref.onPhotoSelect,
      onPhotoSelect = _ref$onPhotoSelect === void 0 ? function (_) {} : _ref$onPhotoSelect,
      _ref$modalWidth = _ref.modalWidth,
      modalWidth = _ref$modalWidth === void 0 ? 840 : _ref$modalWidth,
      _ref$modalClassName = _ref.modalClassName,
      modalClassName = _ref$modalClassName === void 0 ? '' : _ref$modalClassName;

  if (!active) {
    return null;
  }

  return React.createElement("div", {
    className: ''
  }, React.createElement(Modal, {
    active: active,
    setActive: setActive,
    width: modalWidth + "px",
    padding: false,
    className: modalClassName
  }, React.createElement(ImagePicker, {
    unsplashAccessKey: unsplashAccessKey,
    initialPhotoSearchQuery: initialPhotoSearchQuery,
    onPhotoSelect: onPhotoSelect
  })));
}

exports.UnSplashImagePicker = ImagePicker;
exports.default = ImagePickerModal;
//# sourceMappingURL=index.js.map
