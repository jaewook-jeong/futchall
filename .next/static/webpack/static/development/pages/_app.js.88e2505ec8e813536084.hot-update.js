webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./components/profileAvatar.js":
/*!*************************************!*\
  !*** ./components/profileAvatar.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
var _jsxFileName = "/Users/kcho/Desktop/react-futchall/front/components/profileAvatar.js",
    _this = undefined;


var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

 // import { UserOutlined } from '@ant-design/icons';

var tabList = [{
  key: "latest",
  tab: "최근 본 구장"
}, {
  key: "info",
  tab: "회원정보"
}];
var contentList = {
  latest: __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["List"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 13
    }
  }),
  info: __jsx("a", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 11
    }
  })
};

var ProfileAvatar = function ProfileAvatar() {
  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(function (state) {
    return state.user;
  }),
      me = _useSelector.me;

  var CardTabs = __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Card"], {
    tabList: tabList // activeTabKey={}
    ,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 23
    }
  });

  return __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Popover"], {
    placement: "bottom",
    trigger: "hover",
    content: CardTabs,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 9
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Avatar"], {
    shape: "circle",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 13
    }
  }, me.nickname));
};

/* harmony default export */ __webpack_exports__["default"] = (ProfileAvatar);

/***/ })

})
//# sourceMappingURL=_app.js.88e2505ec8e813536084.hot-update.js.map