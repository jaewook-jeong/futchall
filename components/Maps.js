/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react';
import Router, { withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { notification, message } from 'antd';
// import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { REFRESH_STADIUMLIST_REQUEST } from '../reducers/location';
import styles from '../SCSS/map.module.scss';

const MapContainer = styled.div`
    height: 70vh;
    text-align: center;
`;

const Maps = (props) => {
  const dispatch = useDispatch();
  const { list, onChangeSelected, nowSelected } = props;
  const { latitude, longitude } = useSelector((state) => state.location);
  const kakaoMap = useRef();
  const newRequest = useRef(null);
  const [overlays, setOverlays] = useState([]);

  useEffect(
    () => {
      let arr = [];
      if (props.router.query.arr) {
        arr = props.router.query.arr.split(',');
        if (arr[0] === 'success') {
          message.success(arr[1]);
        } else if (arr[0] === 'warn') {
          notification.destroy();
          notification.open({ message: '현재위치로 탐색하시려면?', description: '이전에 위치정보 제공을 동의하시지 않은 경우, 주소창 앞 자물쇠 버튼을 클릭하여 수정하여 주세요.(Internet Explorer에서는 사용하실 수 없습니다.)', duration: 0 });
        } else {
          message.error(arr[1], 4);
        }
      }
      const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 7,
      };
      kakaoMap.current = new kakao.maps.Map(document.getElementById('mapContainer'), options);
      kakaoMap.current.addControl(
        new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT
      );
      const bounds = kakaoMap.current.getBounds();
      const swLatLng = bounds.getSouthWest();
      const neLatLng = bounds.getNorthEast();
      dispatch({
        type: REFRESH_STADIUMLIST_REQUEST,
        data: {
          left: swLatLng.getLat(),
          right: neLatLng.getLat(),
          top: neLatLng.getLng(),
          bottom: swLatLng.getLng(),
        },
      });
      kakao.maps.event.addListener(kakaoMap.current, 'dragend', () => {
        clearTimeout(newRequest.current);
        const bounds = kakaoMap.current.getBounds();
        // 영역의 남서쪽 좌표를 얻어옵니다
        const swLatLng = bounds.getSouthWest();
        // 영역의 북동쪽 좌표를 얻어옵니다
        const neLatLng = bounds.getNorthEast();
        newRequest.current = setTimeout(() => {
          // console.log('왼쪽', swLatLng.getLat(), '아래쪽', swLatLng.getLng());
          // console.log('오른쪽', neLatLng.getLat(), '위쪽', neLatLng.getLng());
          dispatch({
            type: REFRESH_STADIUMLIST_REQUEST,
            data: {
              left: swLatLng.getLat(),
              right: neLatLng.getLat(),
              top: neLatLng.getLng(),
              bottom: swLatLng.getLng(),
            },
          });
        }, 400);
      });
    }, [],
  );
  useEffect(() => {
    let tempOverlays = [];
    list.forEach((stadiumInfo, index) => {
      const position = new kakao.maps.LatLng(stadiumInfo.lat, stadiumInfo.lng);
      let icon;
      if (stadiumInfo.occupation === 'Y') {
        icon = new kakao.maps.MarkerImage(
          '/markerY.png',
          new kakao.maps.Size(32, 32),
          {
            offset: new kakao.maps.Point(18, 42),
            alt: '점령중',
            shape: 'poly',
            coords: '1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33'
          },
        );
      } else {
        icon = new kakao.maps.MarkerImage(
          '/markerN.png',
          new kakao.maps.Size(32, 32),
          {
            offset: new kakao.maps.Point(18, 42),
            alt: '점령가능',
            shape: 'poly',
            coords: '1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33'
          },
        );
      }
      const marker = new kakao.maps.Marker(
        {
          map: kakaoMap.current,
          position,
          image: icon,
        },
      );
      let customOverlay = new daum.maps.CustomOverlay({
        position: marker.getPosition(),
      });
      let content = document.createElement('div');
      content.className = `${styles.mapOverLay}`;

      let content_inner = document.createElement('div');
      content_inner.className = `${styles.overLayInner}`;

      let content_title = document.createElement('div');
      content_title.className = `${styles.innerTitle}`;

      let btn_close = document.createElement('div');
      btn_close.className = `${styles.titleClose}`;
      btn_close.setAttribute('title', '닫기');
      btn_close.onclick = () => { customOverlay.setMap(null); onChangeSelected(-1); };

      content_title.appendChild(document.createTextNode(stadiumInfo.title));
      content_title.appendChild(btn_close);

      let content_body = document.createElement('div');
      content_body.className = `${styles.innerBody}`;

      let body_img = document.createElement('div');
      body_img.className = `${styles.bodyImg}`;
      let img = document.createElement('img');
      img.setAttribute('src', stadiumInfo.Images.src);
      body_img.appendChild(img);

      let body_info = document.createElement('div');
      body_info.className = `${styles.bodyInfo}`;
      let info_address = document.createElement('div');
      info_address.className = `${styles.bodyAddress}`;
      info_address.appendChild(document.createTextNode(stadiumInfo.address));
      let info_href = document.createElement('div');
      let href_anchor = document.createElement('a');
      href_anchor.appendChild(document.createTextNode('구장 확인하러 가기'));
      href_anchor.onclick = () => { Router.push(`/stadium/${stadiumInfo.id}`); };
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

      // eslint-disable-next-line func-names
      // eslint-disable-next-line no-shadow
      (function (marker, customOverlay) {
        kakao.maps.event.addListener(marker, 'click', () => {
          customOverlay.setMap(kakaoMap.current);
          onChangeSelected(index);
        });
      }(marker, customOverlay));
      tempOverlays.push(customOverlay);
    });
    setOverlays(tempOverlays);
    kakaoMap.current.relayout();
  }, [list]);

  useEffect(() => {
    if (nowSelected !== -1) {
      const immuneArr = [...overlays];
      immuneArr.map((val, index) => {
        if (nowSelected == index) {
          val.setMap(kakaoMap.current);
        } else {
          val.setMap(null);
        }
      });
      setOverlays(immuneArr);
    }
  }, [nowSelected]);

  return (
    <MapContainer id="mapContainer" />
  );
};
Maps.propTypes = {
  props: PropTypes.shape({
    router: PropTypes.object,
    list: PropTypes.array,
    onChangeSelected: PropTypes.func.isRequired,
    nowSelected: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }).isRequired,
};

export default withRouter(Maps);
