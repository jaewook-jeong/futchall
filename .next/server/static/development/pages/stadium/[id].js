module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/StadiumComment.js":
/*!**************************************!*\
  !*** ./components/StadiumComment.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _reducers_stadium__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reducers/stadium */ "./reducers/stadium.js");
var _jsxFileName = "/Users/kcho/Desktop/react-futchall/front/components/StadiumComment.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






const CommentList = ({
  comments
}) => __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["List"], {
  dataSource: comments,
  itemLayout: "horizontal",
  renderItem: props => __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Comment"], _extends({}, props, {
    avatar: __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Avatar"], {
      shape: "circle",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 58
      }
    }, props.profile),
    actions: [__jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Rate"], {
      disabled: true,
      value: props.rating,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 117
      }
    })],
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 30
    }
  })),
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7,
    columnNumber: 5
  }
});

const StadiumComment = () => {
  const {
    comments,
    isAddingComment,
    isAddedComment
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.stadium);
  const {
    isLoggedIn,
    me
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.user);
  const {
    0: comment,
    1: onChangeComment
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const {
    0: rate,
    1: onSetRate
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(3);
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();

  const handleSubmit = () => {
    dispatch({
      type: _reducers_stadium__WEBPACK_IMPORTED_MODULE_3__["ADD_COMMENT_REQUEST"],
      data: {
        datetime: new Date().toLocaleString(),
        content: comment,
        profile: me.nickname,
        author: me.nickname,
        rating: rate
      }
    });
  };

  const handleChange = e => {
    onChangeComment(e.target.value);
  };

  const onChangeRate = e => {
    onSetRate(e);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (isAddedComment) {
      onChangeComment('');
      onSetRate(3);
    }
  }, [isAddedComment]);
  return __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 9
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Comment"], {
    avatar: isLoggedIn && __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Avatar"], {
      shape: "circle",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 37
      }
    }, me.nickname),
    content: isLoggedIn && __jsx("div", {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 17
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Form"].Item, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 21
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Input"].TextArea, {
      rows: 4,
      onChange: handleChange,
      value: comment,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 25
      }
    })), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Form"].Item, {
      label: "\uBCC4\uC810",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 21
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Rate"], {
      onChange: onChangeRate,
      value: rate,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 25
      }
    })), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Form"].Item, {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 21
      }
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      htmlType: "submit",
      loading: isAddingComment,
      onClick: handleSubmit,
      type: "primary",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 25
      }
    }, "\uB4F1\uB85D"))),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 13
    }
  }), comments.length > 0 && __jsx(CommentList, {
    comments: comments,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 37
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (StadiumComment);

/***/ }),

/***/ "./pages/stadium/[id].js":
/*!*******************************!*\
  !*** ./pages/stadium/[id].js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_StadiumComment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/StadiumComment */ "./components/StadiumComment.js");
/* harmony import */ var _reducers_stadium__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../reducers/stadium */ "./reducers/stadium.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__);
var _jsxFileName = "/Users/kcho/Desktop/react-futchall/front/pages/stadium/[id].js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;








const Stadium = () => {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__["useRouter"])();
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  const {
    id
  } = router.query;
  const {
    info,
    isSelected
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(state => state.stadium);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    dispatch({
      type: _reducers_stadium__WEBPACK_IMPORTED_MODULE_5__["SELECT_STADIUM_REQUEST"],
      data: {
        req: id
      }
    });
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (isSelected) {
      const options = {
        center: new kakao.maps.LatLng(info.lat, info.lng),
        level: 3
      };
      const map = new kakao.maps.Map(document.getElementById("stadiumAddress"), options);
      map.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT); //나중에 info에 팀 사진 가져와서 overlay로 띄우자

      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(info.lat, info.lng)
      });
    }
  }, [isSelected]);
  return __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 9
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    gutter: [0, 16],
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 13
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    xs: {
      span: 22,
      offset: 1
    },
    sm: {
      span: 22,
      offset: 1
    },
    md: {
      span: 18,
      offset: 3
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 17
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Typography"].Title, {
    level: 3,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 21
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
    loading: !isSelected,
    active: true,
    paragraph: false,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 25
    }
  }), isSelected && info.title, isSelected && __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    onClick: () => {
      antd__WEBPACK_IMPORTED_MODULE_3__["message"].info("링크가 복사되었습니다.");
    },
    type: "link",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 40
    }
  }, __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__["CopyOutlined"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 105
    }
  }), "Copy")), __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Tabs"], {
    tabBarExtraContent: __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      onClick: () => {
        antd__WEBPACK_IMPORTED_MODULE_3__["message"].warn("준비중입니다.");
      },
      shape: "round",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 48
      }
    }, __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__["QuestionCircleOutlined"], {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 110
      }
    }), "\uC815\uBCF4\uC218\uC815"),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 21
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Tabs"].TabPane, {
    tab: "\uC0C1\uC138\uC815\uBCF4",
    key: "1",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 25
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Descriptions"], {
    column: {
      xxl: 4,
      xl: 3,
      lg: 3,
      md: 2,
      sm: 1,
      xs: 1
    },
    bordered: true,
    size: "middle",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 29
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Descriptions"].Item, {
    label: "\uC8FC\uC18C",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 33
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
    loading: !isSelected,
    active: true,
    paragraph: false,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 37
    }
  }), isSelected && info.address), __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Descriptions"].Item, {
    label: "\uC0AC\uC6A9\uC2DC\uAC04",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 33
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
    loading: !isSelected,
    active: true,
    paragraph: false,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 37
    }
  }), isSelected && info.time), __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Descriptions"].Item, {
    label: "\uB77C\uC774\uD2B8 \uC5EC\uBD80",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 37
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
    loading: !isSelected,
    active: true,
    paragraph: false,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 33
    }
  }), isSelected && info.light), __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Descriptions"].Item, {
    label: "\uD2B9\uC9D5",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 33
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
    loading: !isSelected,
    active: true,
    paragraph: false,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 37
    }
  }), isSelected && info.special.map(c => {
    return __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Tag"], {
      key: c,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 49
      }
    }, "#", c);
  })), __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Descriptions"].Item, {
    label: "\uC18C\uAC1C",
    span: 2,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 33
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
    loading: !isSelected,
    active: true,
    paragraph: false,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 33
    }
  }), isSelected && info.description), __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Descriptions"].Item, {
    label: "\uC810\uB839 \uD300",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 33
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
    loading: !isSelected,
    active: true,
    paragraph: false,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 33
    }
  }), isSelected && __jsx("a", {
    onClick: () => {
      alert(`${info.teamInfo}`);
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 52
    }
  }, info.team)), __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Descriptions"].Item, {
    label: __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "\uC720\uD6A8\uAE30\uAC04 ", __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], {
      title: "\uC810\uB839 \uD6C4 \uB3C4\uC804\uC744 \uBC1B\uC9C0 \uC54A\uC744 \uC2DC \uC720\uC9C0\uB418\uB294 \uAE30\uAC04\uC785\uB2C8\uB2E4.",
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 66
      }
    }, __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__["QuestionCircleOutlined"], {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 112
      }
    }))),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 33
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
    loading: !isSelected,
    active: true,
    paragraph: false,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 37
    }
  }), isSelected && info.valid)), __jsx("div", {
    id: "stadiumAddress",
    style: {
      width: '100%',
      height: '500px',
      marginTop: '10px'
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 29
    }
  })), __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Tabs"].TabPane, {
    tab: "\uD6C4\uAE30",
    key: "2",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 25
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
    active: true,
    loading: !isSelected,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 33
    }
  }), isSelected && __jsx(_components_StadiumComment__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 48
    }
  })), __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Tabs"].TabPane, {
    tab: "\uC0AC\uC9C4",
    key: "3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 25
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Skeleton"], {
    active: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 33
    }
  }))))), __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 13
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    xs: {
      span: 22,
      offset: 1
    },
    sm: {
      span: 22,
      offset: 1
    },
    md: {
      span: 18,
      offset: 3
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 17
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Stadium);

/***/ }),

/***/ "./reducers/stadium.js":
/*!*****************************!*\
  !*** ./reducers/stadium.js ***!
  \*****************************/
/*! exports provided: initialState, SELECT_STADIUM_REQUEST, SELECT_STADIUM_SUCCESS, SELECT_STADIUM_FAILURE, ENROLL_STADIUM_REQUEST, ENROLL_STADIUM_SUCCESS, ENROLL_STADIUM_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SELECT_STADIUM_REQUEST", function() { return SELECT_STADIUM_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SELECT_STADIUM_SUCCESS", function() { return SELECT_STADIUM_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SELECT_STADIUM_FAILURE", function() { return SELECT_STADIUM_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENROLL_STADIUM_REQUEST", function() { return ENROLL_STADIUM_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENROLL_STADIUM_SUCCESS", function() { return ENROLL_STADIUM_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENROLL_STADIUM_FAILURE", function() { return ENROLL_STADIUM_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_COMMENT_REQUEST", function() { return ADD_COMMENT_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_COMMENT_SUCCESS", function() { return ADD_COMMENT_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_COMMENT_FAILURE", function() { return ADD_COMMENT_FAILURE; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const dummyInfo = {
  req: "0",
  title: "누상동 다목적 운동장",
  lat: "37.5795876",
  lng: "126.9636324",
  address: "서울특별시 종로구 누상동 1-3",
  time: "상시개방",
  light: "N",
  special: ["플라스틱 인도어구장", "화장실"],
  description: "인왕산 초입에 있는 풋살 구장입니다. 골대와 바닥, 펜스가 최근에 교체하여 깔끔합니다.",
  team: "잔디FC",
  teamInfo: "1",
  valid: "2020-05-05"
};
const initialState = {
  info: null,
  //스타디움 정보
  pictures: [],
  comments: [],
  isEnrolling: false,
  //새 구장 등록중
  isEnrolled: false,
  //새 구장 등록 성공
  enrollmentErrorReason: '',
  //새 구장 등록 실패 사유
  isSelected: false,
  //구장 선택 성공
  isSelecting: false,
  //구장 선택중
  selectedErrorReason: '',
  //구장 선택 실패 사유
  isAddingComment: false,
  //구장 평점 등록중
  isAddedComment: false,
  //구장 평점 등록 완료
  addedCommentErrorReason: '' //구장 평점 등록 실패 사유

};
const SELECT_STADIUM_REQUEST = 'SELECT_STADIUM_REQUSET';
const SELECT_STADIUM_SUCCESS = 'SELECT_STADIUM_SUCCESS';
const SELECT_STADIUM_FAILURE = 'SELECT_STADIUM_FAILURE';
const ENROLL_STADIUM_REQUEST = 'ENROLL_STADIUM_REQUSET';
const ENROLL_STADIUM_SUCCESS = 'ENROLL_STADIUM_SUCCESS';
const ENROLL_STADIUM_FAILURE = 'ENROLL_STADIUM_FAILURE';
const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUSET';
const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
/* harmony default export */ __webpack_exports__["default"] = ((state = initialState, action) => {
  switch (action.type) {
    case SELECT_STADIUM_REQUEST:
      {
        return _objectSpread({}, state, {
          isSelecting: true,
          selectedErrorReason: ''
        });
      }

    case SELECT_STADIUM_SUCCESS:
      {
        return _objectSpread({}, state, {
          isSelecting: false,
          isSelected: true,
          info: dummyInfo,
          comments: action.data
        });
      }

    case SELECT_STADIUM_FAILURE:
      {
        return _objectSpread({}, state, {
          isSelecting: false,
          selectedErrorReason: action.error,
          info: null,
          isSelected: false
        });
      }

    case ENROLL_STADIUM_REQUEST:
      {
        return _objectSpread({}, state, {
          isEnrolling: true,
          isEnrolled: false,
          enrollmentErrorReason: ''
        });
      }

    case ENROLL_STADIUM_SUCCESS:
      {
        return _objectSpread({}, state, {
          isEnrolled: true,
          isEnrolling: false
        });
      }

    case ENROLL_STADIUM_FAILURE:
      {
        return _objectSpread({}, state, {
          isEnrolling: false,
          enrollmentErrorReason: action.error
        });
      }

    case ADD_COMMENT_REQUEST:
      {
        return _objectSpread({}, state, {
          isAddingComment: true,
          isAddedComment: false,
          addedCommentErrorReason: ''
        });
      }

    case ADD_COMMENT_SUCCESS:
      {
        return _objectSpread({}, state, {
          isAddedComment: true,
          isAddingComment: false,
          comments: action.data
        });
      }

    case ADD_COMMENT_FAILURE:
      {
        return _objectSpread({}, state, {
          isAddingComment: false,
          addedCommentErrorReason: action.error
        });
      }

    default:
      {
        return _objectSpread({}, state);
      }
  }
});

/***/ }),

/***/ 6:
/*!*************************************!*\
  !*** multi ./pages/stadium/[id].js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/kcho/Desktop/react-futchall/front/pages/stadium/[id].js */"./pages/stadium/[id].js");


/***/ }),

/***/ "@ant-design/icons":
/*!************************************!*\
  !*** external "@ant-design/icons" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons");

/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ })

/******/ });
//# sourceMappingURL=[id].js.map