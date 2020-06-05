import React, { useEffect, useState } from 'react';
import Router, { withRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { REFRESH_STADIUMLIST_REQUEST } from '../reducers/location';
import { notification, message } from 'antd';
import { LoadingOutlined,} from '@ant-design/icons';
import  styles from '../SCSS/map.module.scss';

const Maps = (props) => {
    const  stadiumList  = props.list;
    const [map, setMap] = useState();
    const { latitude, longitude,} = useSelector(state => state.location);
    const dispatch = useDispatch();
    let options;
    let temp;

    useEffect(
        () => {
            //최초 마운트 시
            options = {
                center: new kakao.maps.LatLng(latitude, longitude),
                level: 8
            };
            temp = new kakao.maps.Map(document.getElementById("mapContainer"), options);
            temp.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
            kakao.maps.event.addListener(temp, 'dragend', function () {
                let latlng = temp.getCenter();
                dispatch({ type:REFRESH_STADIUMLIST_REQUEST , data:{latitude: latlng.getLat(), longitude: latlng.getLng()} });
            });
            setMap(temp);
            if (props.router.query.arr) {
                const arr = props.router.query.arr.split(",");
                if (arr[0] === "success") {
                    message.success(arr[1]);
                } else if (arr[0] === "warn") {
                    notification.destroy();
                    notification.open({ message: "현재위치로 탐색하시려면?", description: "이전에 위치정보 제공을 동의하시지 않은 경우, 주소창 앞 자물쇠 버튼을 클릭하여 수정하여 주세요.(Internet Explorer에서는 사용하실 수 없습니다.)", duration: 0 })
                } else {
                    message.error(arr[1], 4);
                }
            }
        }, []
    );
    useEffect(() => {
        stadiumList.forEach((c) => {
            let position = new kakao.maps.LatLng(c.lat, c.lng);
            let marker = new kakao.maps.Marker(
                {
                    map: temp ?? map,
                    position: position
                }
            )
            let customOverlay = new daum.maps.CustomOverlay({
                position: marker.getPosition()
            });

            let content = document.createElement('div');
            content.className = `${styles.mapOverLay}`

            let content_inner = document.createElement('div');
            content_inner.className = `${styles.overLayInner}`

            let content_title = document.createElement('div');
            content_title.className = `${styles.innerTitle}`

            let btn_close = document.createElement('div');
            btn_close.className = `${styles.titleClose}`
            btn_close.setAttribute("title", "닫기");
            btn_close.onclick = function() { customOverlay.setMap(null); };
            
            content_title.appendChild(document.createTextNode(c.title));
            content_title.appendChild(btn_close);

            let content_body = document.createElement('div');
            content_body.className = `${styles.innerBody}`
            
            let body_img = document.createElement('div');
            body_img.className = `${styles.bodyImg}`
            let img = document.createElement('img');
            img.setAttribute('src', c.src ?? "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png");
            body_img.appendChild(img);

            let body_info = document.createElement('div');
            body_info.className = `${styles.bodyInfo}`
            let info_address = document.createElement('div');
            info_address.className = `${styles.bodyAddress}`
            info_address.appendChild(document.createTextNode(c.address));
            let info_href = document.createElement('div');
            let href_anchor = document.createElement('a');
            href_anchor.appendChild(document.createTextNode("구장 확인하러 가기"));
            href_anchor.onclick = function() { Router.push(`/stadium/${c.req}`)};
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
                    customOverlay.setMap(temp ?? map);
                });
            })(marker, customOverlay);
        })
    }, [stadiumList])
    return (
        <div id="mapContainer" style={{ height: '70vh', textAlign: 'center' }}>
            <LoadingOutlined style={{ margin: '0 auto', width: '10vh', height: '10vh' }} />
        </div>
    );
};

export default withRouter(Maps);