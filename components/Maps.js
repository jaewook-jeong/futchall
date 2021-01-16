/* eslint-disable no-undef */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Router, { withRouter, useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { notification, message, Button } from 'antd';
import styled from 'styled-components';

import { REFRESH_STADIUMLIST_REQUEST } from '../reducers/location';
import styles from '../SCSS/map.module.scss';
import getLocation from '../util/getLocation';

const MapContainer = styled.div`
    height: 70vh;
    text-align: center;
`;

const Maps = ({ list, onChangeSelected, nowSelected }) => {
  const dispatch = useDispatch();
  const {isChangingLocation, isChangedLocation} = useSelector((state) => state.location);
  const kakaoMap = useRef();
  const router = useRouter();
  const newRequest = useRef();
  const [btnVisible, setBtnVisible] = useState(false);
  const [overlays, setOverlays] = useState([]);

  const ReloadMap = useCallback(() => {
    const boundery = kakaoMap.current.getBounds();
    const boundSwLatLng = boundery.getSouthWest();
    const boundNeLatLng = boundery.getNorthEast();
    dispatch({
      type: REFRESH_STADIUMLIST_REQUEST,
      data: {
        left: boundSwLatLng.getLat(),
        right: boundNeLatLng.getLat(),
        top: boundNeLatLng.getLng(),
        bottom: boundSwLatLng.getLng(),
      },
    });
  }, []);
  useEffect(() => {
    if (isChangedLocation) {
      !isChangingLocation && setBtnVisible(false);
    }
  }, [isChangedLocation, isChangingLocation]);
  useEffect(() => {
    const firstLoadMap = async () => {
      try {
        await getLocation().then((result) => {
          if (router.query.loc) {
            result[2] = router.query.lat;
            result[3] = router.query.lng;
            message.success(`'${router.query.loc}'지역으로 검색한 결과입니다!`, 5);
          }
          const options = {
            center: new kakao.maps.LatLng(result[2] ?? 37.5663, result[3] ?? 126.9779),
            level: 7,
          };
          kakaoMap.current = new kakao.maps.Map(document.getElementById('mapContainer'), options);
          kakaoMap.current.addControl(
            new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT,
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
            newRequest.current = setTimeout(() => (
              setBtnVisible(true)
            ), 700);
          });
          if (result[0] === 'success') {
            message.success('현재위치에 기반한 구장정보입니다.');
          } else {
            notification.destroy();
            if (!router.query.loc) {
              notification.open({ message: '현재위치로 탐색하시려면?', description: '이전에 위치정보 제공을 동의하시지 않은 경우, 주소창 앞 자물쇠 버튼을 클릭하여 수정하여 주세요.(Internet Explorer에서는 사용하실 수 없습니다.)', duration: 0 });
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
    firstLoadMap();
  }, []);
  useEffect(() => {
    const tempOverlays = [];
    list.forEach((stadiumInfo, index) => {
      const position = new kakao.maps.LatLng(stadiumInfo.lat, stadiumInfo.lng);
      let icon;
      if (stadiumInfo.TeamId) {
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
      const customOverlay = new daum.maps.CustomOverlay({
        position: marker.getPosition(),
      });
      const content = document.createElement('div');
      content.className = `${styles.mapOverLay}`;

      const contentInner = document.createElement('div');
      contentInner.className = `${styles.overLayInner}`;

      const contentTitle = document.createElement('div');
      contentTitle.className = `${styles.innerTitle}`;

      const btnClose = document.createElement('div');
      btnClose.className = `${styles.titleClose}`;
      btnClose.setAttribute('title', '닫기');
      btnClose.onclick = () => { customOverlay.setMap(null); onChangeSelected(-1); };

      contentTitle.appendChild(document.createTextNode(`${stadiumInfo.title} ${stadiumInfo.TeamId ? ": "+ stadiumInfo.Team.title + "  점령중" : ''} `));
      contentTitle.appendChild(btnClose);

      const contentBody = document.createElement('div');
      contentBody.className = `${styles.innerBody}`;

      const bodyImgOutter = document.createElement('div');
      bodyImgOutter.className = `${styles.bodyImg}`;
      const bodyImgInner = document.createElement('div');
      bodyImgInner.className = `${styles.bodyImgInner}`;
      const imgCenter = document.createElement('div');
      imgCenter.className = `${styles.imgCenter}`;

      const img = document.createElement('img');
      img.setAttribute('src', `${stadiumInfo?.Team?.Images[0]?.src ? stadiumInfo?.Team?.Images[0]?.src : stadiumInfo.Images[0].src}`);
      imgCenter.appendChild(img);
      bodyImgInner.appendChild(imgCenter);
      bodyImgOutter.appendChild(bodyImgInner);

      const bodyInfo = document.createElement('div');
      bodyInfo.className = `${styles.bodyInfo}`;
      const infoOccupyTeam = document.createElement('div');
      infoOccupyTeam.className = `${styles.bodyAddress}`;
      if (stadiumInfo?.Team?.title) {
        infoOccupyTeam.appendChild(document.createTextNode(`"${stadiumInfo.Team?.title}"팀이 점령중입니다.`));
      } else {
        infoOccupyTeam.appendChild(document.createTextNode("현재 점령중인 팀이 없습니다."));
      }
      const infoAddress = document.createElement('div');
      infoAddress.className = `${styles.bodyAddress}`;
      infoAddress.appendChild(document.createTextNode(stadiumInfo.address));
      const infoHref = document.createElement('div');
      const hrefAnchor = document.createElement('a');
      hrefAnchor.appendChild(document.createTextNode('구장 확인하러 가기'));
      hrefAnchor.onclick = () => { Router.push(`/stadium/${stadiumInfo.id}`); };
      infoHref.appendChild(hrefAnchor);

      bodyInfo.appendChild(infoOccupyTeam);
      bodyInfo.appendChild(infoAddress);
      bodyInfo.appendChild(infoHref);
      contentBody.appendChild(bodyImgOutter);
      contentBody.appendChild(bodyInfo);

      contentInner.appendChild(contentTitle);
      contentInner.appendChild(contentBody);
      content.appendChild(contentInner);

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
    kakaoMap.current?.relayout();
  }, [list]);

  useEffect(() => {
    if (nowSelected !== -1) {
      const immuneArr = [...overlays];
      immuneArr.forEach((val, index) => {
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
    <MapContainer id="mapContainer">
      {
        btnVisible && (
          <div style={{float: 'left', padding: '5px 0px 0px 15px'}}>
            <Button style={{zIndex: 2, }} shape="round" type="primary" onClick={ReloadMap} loading={isChangingLocation}>{!isChangingLocation && <ReloadOutlined/>} 이 위치에서 다시 검색</Button>
          </div>
        )
      }
      <LoadingOutlined style={{fontSize: '30px'}} />
    </MapContainer>
  );
};
Maps.propTypes = {
  onChangeSelected: PropTypes.func.isRequired,
  nowSelected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  list: PropTypes.array,
};

export default withRouter(Maps);
