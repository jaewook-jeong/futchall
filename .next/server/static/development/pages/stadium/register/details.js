module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/stadium/register/details.js":
/*!*******************************************!*\
  !*** ./pages/stadium/register/details.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _reducers_stadium__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../reducers/stadium */ "./reducers/stadium.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/Users/kcho/Desktop/react-futchall/front/pages/stadium/register/details.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const Details = props => {
  // const [, forceUpdate] = useState(); 
  const {
    isEnrolling
  } = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(state => state.stadium);
  const [form] = antd__WEBPACK_IMPORTED_MODULE_4__["Form"].useForm();
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
  let data;

  if (props.router.query.data) {
    data = props.router.query.data.split(",");
  } else {
    console.log("어디서 사기치려고하니?");
  }

  const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 14
    }
  };
  const onSubmitForm = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(values => {
    console.log(values);
    dispatch({
      type: _reducers_stadium__WEBPACK_IMPORTED_MODULE_3__["ENROLL_STADIUM_REQUEST"],
      data: _objectSpread({}, values)
    });
  });
  const multipleSpecaility = [__jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Select"].Option, {
    key: "1",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 9
    }
  }, "\uC794\uB514\uAD6C\uC7A5"), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Select"].Option, {
    key: "2",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }
  }, "\uC6B0\uB808\uD0C4\uAD6C\uC7A5"), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Select"].Option, {
    key: "3",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 9
    }
  }, "\uD50C\uB77C\uC2A4\uD2F1 \uC778\uB3C4\uC5B4\uAD6C\uC7A5"), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Select"].Option, {
    key: "4",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 9
    }
  }, "\uC0E4\uC6CC\uC2E4"), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Select"].Option, {
    key: "5",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 9
    }
  }, "\uADFC\uCC98 \uD3B8\uC758\uC810"), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Select"].Option, {
    key: "6",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 9
    }
  }, "\uD0C8\uC758\uC2E4"), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Select"].Option, {
    key: "7",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 9
    }
  }, "\uB300\uAE30\uC6A9 \uC88C\uC11D")];

  const normFile = e => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const uploadButton = __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 5
    }
  }, __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__["PlusOutlined"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 9
    }
  }), __jsx("div", {
    className: "ant-upload-text",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 9
    }
  }, "Upload")); // useEffect(() => {
  //     forceUpdate({});
  // }, []);


  return __jsx("div", {
    style: {
      width: '430px',
      margin: "0 auto",
      border: "1px solid #dadce0",
      borderRadius: "8px",
      padding: "30px 10px"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 9
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    gutter: [0, 16],
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 13
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    style: {
      width: '100%',
      textAlign: "center"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 17
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Typography"].Title, {
    level: 3,
    style: {
      color: "#202124"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 21
    }
  }, "\uAD6C\uC7A5 \uB4F1\uB85D\uD558\uAE30"), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Typography"], {
    style: {
      color: "#202124",
      fontWeight: "normal"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 21
    }
  }, "\uAD6C\uC7A5 \uC0C1\uC138\uC815\uBCF4"))), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    gutter: [0, 16],
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 13
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Col"], {
    span: 22,
    offset: 1,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 17
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Form"], _extends({}, formItemLayout, {
    layout: "horizontal",
    form: form,
    initialValues: {
      location: data ? data[2] : '',
      light: 'N'
    },
    onFinish: onSubmitForm,
    scrollToFirstError: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 21
    }
  }), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Form"].Item, {
    name: "title",
    label: "\uAD6C\uC7A5\uBA85",
    rules: [{
      required: true,
      message: "구장명을 입력하여주세요"
    }],
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 25
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Input"], {
    placeholder: "\uC815\uC2DD \uAD6C\uC7A5\uBA85\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 29
    }
  })), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Form"].Item, {
    name: "location",
    label: "\uC8FC\uC18C",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 25
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Input"], {
    disabled: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 29
    }
  })), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Form"].Item, {
    name: "time",
    label: "\uC0AC\uC6A9\uC2DC\uAC04",
    rules: [{
      required: true,
      message: "사용가능 시간을 확인해주세요"
    }],
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 25
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["TimePicker"].RangePicker, {
    mode: "time",
    use12Hours: true,
    format: "h:mm a",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 29
    }
  })), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Form"].Item, {
    name: "light",
    label: "\uB77C\uC774\uD2B8 \uC5EC\uBD80",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 25
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Radio"].Group, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 29
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Radio"], {
    value: "Y",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 33
    }
  }, "\uC788\uC74C"), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Radio"], {
    value: "N",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 33
    }
  }, "\uC5C6\uC74C"))), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Form"].Item, {
    name: "size",
    label: "\uAD6C\uC7A5 \uC0AC\uC774\uC988",
    rules: [{
      required: true,
      message: "구장 크기를 체크해주세요"
    }],
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 25
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Radio"].Group, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 29
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Radio"], {
    value: "F",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 33
    }
  }, "\uD48B\uC0B4"), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Radio"], {
    value: "M",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 33
    }
  }, "\uC911\uD615 \uCD95\uAD6C\uC7A5"), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Radio"], {
    value: "N",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 33
    }
  }, "\uAD6D\uC81C\uADDC\uACA9 \uCD95\uAD6C\uC7A5"))), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Form"].Item, {
    name: "special",
    label: "\uD2B9\uC9D5",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 25
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Select"], {
    mode: "tags",
    placeholder: "\uAD6C\uC7A5\uC758 \uB2E4\uC591\uD55C \uD2B9\uC9D5\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 29
    }
  }, multipleSpecaility)), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Form"].Item, {
    name: "description",
    label: "\uC124\uBA85",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 128,
      columnNumber: 25
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Input"].TextArea, {
    placeholder: "\uAD6C\uC7A5 \uC124\uBA85\uACFC \uD2B9\uC9D5\uC744 \uC801\uC5B4\uC8FC\uC138\uC694\x1D",
    autoSize: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 29
    }
  })), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Form"].Item, {
    name: "picture",
    label: "\uC0AC\uC9C4",
    valuePropName: "fileList",
    getValueFromEvent: normFile,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 25
    }
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Upload"], {
    name: "upload",
    listType: "picture-card",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 29
    }
  }, uploadButton)), __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Form"].Item, {
    shouldUpdate: true,
    wrapperCol: {
      span: 18,
      offset: 6
    },
    style: {
      marginBottom: 0
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 146,
      columnNumber: 25
    }
  }, () => __jsx(antd__WEBPACK_IMPORTED_MODULE_4__["Button"], {
    type: "primary",
    htmlType: "submit",
    shape: "round",
    loading: isEnrolling,
    disabled: !form.isFieldsTouched(["title", "size", "time"], true) || form.getFieldsError().filter(({
      errors
    }) => errors.length).length,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 29
    }
  }, "\uB4F1\uB85D\uD558\uAE30"))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(Details));

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

/***/ 3:
/*!*************************************************!*\
  !*** multi ./pages/stadium/register/details.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/kcho/Desktop/react-futchall/front/pages/stadium/register/details.js */"./pages/stadium/register/details.js");


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
//# sourceMappingURL=details.js.map