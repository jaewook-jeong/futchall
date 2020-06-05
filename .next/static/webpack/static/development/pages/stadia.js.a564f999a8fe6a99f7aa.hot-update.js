webpackHotUpdate("static/development/pages/stadia.js",{

/***/ "./components/Maps.js":
/*!****************************!*\
  !*** ./components/Maps.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers_location__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../reducers/location */ "./reducers/location.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/index.js");
/* harmony import */ var _SCSS_map_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../SCSS/map.module.scss */ "./SCSS/map.module.scss");
/* harmony import */ var _SCSS_map_module_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_SCSS_map_module_scss__WEBPACK_IMPORTED_MODULE_7__);
var _this = undefined,
    _jsxFileName = "/Users/kcho/Desktop/react-futchall/front/components/Maps.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;









var Maps = function Maps(props) {
  var stadiumList = props.list;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(),
      map = _useState[0],
      setMap = _useState[1];

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(function (state) {
    return state.location;
  }),
      latitude = _useSelector.latitude,
      longitude = _useSelector.longitude;

  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])();
  var options;
  var temp;

  function closeOverlay() {
    overlay.setMap(null);
  }

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    //최초 마운트 시
    options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 8
    };
    temp = new kakao.maps.Map(document.getElementById("mapContainer"), options);
    temp.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
    kakao.maps.event.addListener(temp, 'dragend', function () {
      var latlng = temp.getCenter();
      dispatch({
        type: _reducers_location__WEBPACK_IMPORTED_MODULE_4__["REFRESH_STADIUMLIST_REQUEST"],
        data: {
          latitude: latlng.getLat(),
          longitude: latlng.getLng()
        }
      });
    });
    setMap(temp);

    if (props.router.query.arr) {
      var arr = props.router.query.arr.split(",");

      if (arr[0] === "success") {
        antd__WEBPACK_IMPORTED_MODULE_5__["message"].success(arr[1]);
      } else if (arr[0] === "warn") {
        antd__WEBPACK_IMPORTED_MODULE_5__["notification"].destroy();
        antd__WEBPACK_IMPORTED_MODULE_5__["notification"].open({
          message: "현재위치로 탐색하시려면?",
          description: "이전에 위치정보 제공을 동의하시지 않은 경우, 주소창 앞 자물쇠 버튼을 클릭하여 수정하여 주세요.(Internet Explorer에서는 사용하실 수 없습니다.)",
          duration: 0
        });
      } else {
        antd__WEBPACK_IMPORTED_MODULE_5__["message"].error(arr[1], 4);
      }
    }
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    stadiumList.forEach(function (c) {
      var _temp, _c$src;

      var position = new kakao.maps.LatLng(c.lat, c.lng);
      var marker = new kakao.maps.Marker({
        map: (_temp = temp) !== null && _temp !== void 0 ? _temp : map,
        position: position
      });
      var customOverlay = new daum.maps.CustomOverlay({
        position: marker.getPosition()
      }); // let content = `<div class="wrap" style="background:white"> 
      //         <div class="info"> 
      //             <div class="title"> 
      //                 ${c.title} 
      //                 <div class="close" onclick="closeOverlay()" title="닫기">X</div> 
      //             </div> 
      //             <div class="body"> 
      //                 <div class="desc"> 
      //                     <div class="ellipsis">${c.address}</div> 
      //                     <div>${<Link href="/stadium/[id]" as={`/stadium/${c.req}`} ><a>구장 확인하기</a></Link>}</div> 
      //                 </div> 
      //             </div> 
      //         </div> 
      //     </div>`;

      var content = document.createElement('div');
      content.className = "".concat(_SCSS_map_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.mapOverLay);
      var content_inner = document.createElement('div');
      content_inner.className = "".concat(_SCSS_map_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.overLayInner);
      var content_title = document.createElement('div');
      content_title.className = "".concat(_SCSS_map_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.innerTitle);
      var btn_close = document.createElement('div');
      btn_close.className = "".concat(_SCSS_map_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.titleClose);
      btn_close.setAttribute("title", "닫기");

      btn_close.onclick = function () {
        customOverlay.setMap(null);
      };

      content_title.appendChild(document.createTextNode(c.title));
      content_title.appendChild(btn_close);
      var content_body = document.createElement('div');
      content_body.className = "".concat(_SCSS_map_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.innerBody);
      var body_img = document.createElement('div');
      body_img.className = "".concat(_SCSS_map_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.bodyImg);
      var img = document.createElement('img');
      img.setAttribute('src', (_c$src = c.src) !== null && _c$src !== void 0 ? _c$src : "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png");
      body_img.appendChild(img);
      var body_info = document.createElement('div');
      body_info.className = "".concat(_SCSS_map_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.bodyInfo);
      var info_address = document.createElement('div');
      info_address.className = "".concat(_SCSS_map_module_scss__WEBPACK_IMPORTED_MODULE_7___default.a.bodyAddress);
      info_address.appendChild(document.createTextNode(c.address));
      var info_href = document.createElement('div');
      var href_anchor = document.createElement('a');
      href_anchor.appendChild(document.createTextNode("구장 확인하러 가기"));

      href_anchor.onclick = function () {
        next_router__WEBPACK_IMPORTED_MODULE_1___default.a.push("/stadium/".concat(c.req));
      };

      info_href.appendChild(href_anchor);
      body_info.appendChild(info_address);
      body_info.appendChild(info_href);
      content_body.appendChild(body_img);
      content_body.appendChild(body_info);
      content_inner.appendChild(content_title);
      content_inner.appendChild(content_body);
      content.appendChild(content_inner);
      customOverlay.setContent(content);
      customOverlay.setMap(null);

      (function (marker, customOverlay) {
        kakao.maps.event.addListener(marker, 'click', function () {
          var _temp2;

          customOverlay.setMap((_temp2 = temp) !== null && _temp2 !== void 0 ? _temp2 : map);
        });
      })(marker, customOverlay);
    });
  }, [stadiumList]);
  return __jsx("div", {
    id: "mapContainer",
    style: {
      height: '70vh',
      textAlign: 'center'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 9
    }
  }, __jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__["LoadingOutlined"], {
    style: {
      margin: '0 auto',
      width: '10vh',
      height: '10vh'
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 13
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(Maps));

/***/ })

})
//# sourceMappingURL=stadia.js.a564f999a8fe6a99f7aa.hot-update.js.map