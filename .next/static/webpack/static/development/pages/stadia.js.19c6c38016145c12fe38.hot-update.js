webpackHotUpdate("static/development/pages/stadia.js",{

/***/ "./components/BattleMap.js":
/*!*********************************!*\
  !*** ./components/BattleMap.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers/location */ "./reducers/location.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var _Maps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Maps */ "./components/Maps.js");
/* harmony import */ var _StadiumList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./StadiumList */ "./components/StadiumList.js");
var _this = undefined,
    _jsxFileName = "/Users/kcho/Desktop/react-futchall/front/components/BattleMap.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







var BattleMap = function BattleMap() {
  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(function (state) {
    return state.location;
  }),
      stadiumList = _useSelector.stadiumList,
      isChangedLocation = _useSelector.isChangedLocation,
      isChangingLocation = _useSelector.isChangingLocation,
      latitude = _useSelector.latitude,
      longitude = _useSelector.longitude;

  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    //If users didn`t access BattleMap page from Index, to cover another access
    if (stadiumList.length === 0) {
      dispatch({
        type: _reducers_location__WEBPACK_IMPORTED_MODULE_2__["REFRESH_STADIUMLIST_REQUEST"],
        data: {
          latitude: latitude,
          longitude: longitude
        }
      });
    }

    console.log(stadiumList);
  }, []);
  return __jsx("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 9
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    gutter: [20, 16],
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 13
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    xs: {
      span: 22,
      offset: 1
    },
    md: {
      span: 15,
      offset: 2
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 17
    }
  }, __jsx(_Maps__WEBPACK_IMPORTED_MODULE_4__["default"], {
    list: stadiumList,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 21
    }
  })), __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    xs: {
      span: 22,
      offset: 1
    },
    md: {
      span: 5,
      offset: 0
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 17
    }
  }, __jsx(_StadiumList__WEBPACK_IMPORTED_MODULE_5__["default"], {
    list: stadiumList,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 21
    }
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (BattleMap);

/***/ })

})
//# sourceMappingURL=stadia.js.19c6c38016145c12fe38.hot-update.js.map