webpackHotUpdate("static/development/pages/stadia.js",{

/***/ "./components/StadiumList.js":
/*!***********************************!*\
  !*** ./components/StadiumList.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
var _this = undefined,
    _jsxFileName = "/Users/kcho/Desktop/react-futchall/front/components/StadiumList.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

 // import { useRouter } from 'next/router';



var StadiumList = function StadiumList(props) {
  return __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["List"], {
    header: __jsx("div", {
      style: {
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: '16px'
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9,
        columnNumber: 21
      }
    }, "\uAD6C\uC7A5 \uB9AC\uC2A4\uD2B8"),
    style: {
      height: '70vh'
    },
    size: "small",
    itemLayout: "vertical",
    pagination: {
      onChange: function onChange(page) {
        console.log(page);
      },
      showLessItems: true
    },
    dataSource: props.list,
    renderItem: function renderItem(item) {
      return __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["List"].Item, {
        key: item.req,
        style: {
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap"
        },
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21,
          columnNumber: 17
        }
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["List"].Item.Meta, {
        title: __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
          href: "/stadium/[id]",
          as: "/stadium/".concat(item.req),
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 26,
            columnNumber: 32
          }
        }, __jsx("a", {
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 26,
            columnNumber: 88
          }
        }, item.title)),
        description: item.tag.map(function (c) {
          return __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Tag"], {
            key: c,
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 28,
              columnNumber: 37
            }
          }, "#", c);
        }),
        style: {
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap"
        },
        __self: _this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 21
        }
      }));
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 9
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (StadiumList);

/***/ })

})
//# sourceMappingURL=stadia.js.90e33c5e713037884330.hot-update.js.map