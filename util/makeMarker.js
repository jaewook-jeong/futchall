import React from 'react';
import { Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const displayMarker = (data, map) => {
    let marker = new kakao.maps.Marker(
        {
            map: map,
            position: new kakao.maps.LatLng(data.latitude, data.longitude)
        }
    )
    let content = <Card style={{ width: '280px' }} actions={[<CloseOutlined key="close"  />]}><Card.Meta title={data.title} /></Card>;
    let overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: null,
        position: marker.getPosition()
    });
    (function (marker, overlay) {
        kakao.maps.event.addListener(marker, 'click', function () {
            overlay.setMap(map);
        });
        function closeOverlay() {
            overlay.setMap(null);
        }
    })(marker, overlay);
}

export const makeMarker = (data, map) => {
    return data.map(displayMarker(data, map)); //마커들의 배열
}