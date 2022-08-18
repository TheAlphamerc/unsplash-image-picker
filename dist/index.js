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
  }, props), React__default.createElement("div", {
    className: 'flex',
    style: {
      maxHeight: '90vh'
    }
  }, React__default.createElement(Card, {
    onClick: function onClick(e) {
      if (active) {
        e.stopPropagation();
      }
    },
    padding: padding,
    className: "overflow-hidden ",
    style: {
      maxWidth: width,
      width: '100%'
    }
  }, children)));
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

function PhotoList(_ref) {
  var _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
      photoList = _ref.photoList,
      onPhotoSelect = _ref.onPhotoSelect,
      loadMore = _ref.loadMore;
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
  }, photoList && photoList.map(function (pic) {
    return React__default.createElement("div", {
      className: 'group relative card border-0 mb-2 cursor-pointer',
      key: pic.id,
      onClick: function onClick() {
        return onPhotoSelect(pic);
      }
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

function InfiniteScroll(_ref2) {
  var pageStart = _ref2.pageStart,
      loadMore = _ref2.loadMore,
      loader = _ref2.loader,
      children = _ref2.children;

  var _React$useState = React__default.useState(false),
      isLoading = _React$useState[0];

  var _React$useState2 = React__default.useState(pageStart),
      page = _React$useState2[0];

  React__default.useEffect(function () {
    var callBack = function callBack() {
      if (window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight) {
        console.log('load more');

        if (!isLoading) {
          loadMore(page + 1);
        }
      }
    };

    window.addEventListener('scroll', callBack);
    return function () {
      window.removeEventListener('scroll', callBack);
    };
  }, [pageStart]);
  return React__default.createElement("div", null, children, isLoading && loader);
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

function UnsplashImagePickerComponent(_ref) {
  var unsplash = _ref.unsplash,
      _ref$active = _ref.active,
      active = _ref$active === void 0 ? false : _ref$active,
      _ref$setActive = _ref.setActive,
      setActive = _ref$setActive === void 0 ? function (_) {} : _ref$setActive;

  var _React$useState = React__default.useState([]),
      pics = _React$useState[0],
      setPics = _React$useState[1];

  var _React$useState2 = React__default.useState(''),
      query = _React$useState2[0],
      setQuery = _React$useState2[1];

  var _React$useState3 = React__default.useState(false),
      isLoading = _React$useState3[0],
      setIsLoading = _React$useState3[1];

  React__default.useEffect(function () {
    fetchPhotos(1, query);
  }, []);

  var fetchPhotos = function fetchPhotos(page, query) {
    setIsLoading(true);
    unsplash.search.getPhotos({
      page: page,
      perPage: 15,
      query: query
    }).then(function (response) {
      var _response$response;

      var newPics = response === null || response === void 0 ? void 0 : (_response$response = response.response) === null || _response$response === void 0 ? void 0 : _response$response.results;

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
    onSearch: function onSearch(query) {
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
    onPhotoSelect: function onPhotoSelect(photo) {
      console.log('photo', photo);
    }
  })))));
}

var UnsplashImagePicker = function UnsplashImagePicker(_ref) {
  var unsplashAccessKey = _ref.unsplashAccessKey,
      _ref$active = _ref.active,
      active = _ref$active === void 0 ? false : _ref$active,
      _ref$setActive = _ref.setActive,
      setActive = _ref$setActive === void 0 ? function (_) {} : _ref$setActive;
  var unsplash = unsplashJs.createApi({
    accessKey: unsplashAccessKey
  });
  return React.createElement(UnsplashImagePickerComponent, {
    unsplash: unsplash,
    active: active,
    setActive: setActive
  });
};

exports.UnsplashImagePicker = UnsplashImagePicker;
//# sourceMappingURL=index.js.map
