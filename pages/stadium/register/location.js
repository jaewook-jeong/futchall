import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { Col, Row, Typography, Button, Tooltip, Input } from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';

const Apply = () => {
    const { latitude, longitude, } = useSelector(state => state.location,[]);
    const { isLoggeIn } = useSelector(state => state.user);
    const [seleted, setSelected] = useState(true);
    const [convey_data, setConvey_data] = useState([]);
    const [find, setFind] = useState('');
    useEffect(()=>{
        if (!isLoggeIn) {
            message.error("로그인 후 이용하여주세요")
            Router.push(`/stadia`);
        }
    },[isLoggeIn])
    

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        Router.push(`/stadium/register/details?data=${convey_data}`, '/stadium/register/details');
    })
    useEffect(()=>{
        const options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 9
        };
        
        var geocoder = new kakao.maps.services.Geocoder();
        const temp = new kakao.maps.Map(document.getElementById("register_map"), options);
        temp.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
        const zoomControl = new kakao.maps.ZoomControl();
        temp.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        let marker;
        function searchDetailAddrFromCoords(coords, callback) {
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }
        if(find != ''){
            geocoder.addressSearch(find, function(result, status){
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    marker = new kakao.maps.Marker({
                    map: temp,
                    position: coords
                    });
                    temp.setCenter(coords);
                }
            })
        }
        
        kakao.maps.event.addListener(temp, 'click', function(mouseEvent) {
            if(marker === undefined){
                marker = new kakao.maps.Marker({ 
                    position: mouseEvent.latLng
                }); 
                marker.setMap(temp);
            }
            let latlngadd = [mouseEvent.latLng.getLat(), mouseEvent.latLng.getLng()];
            marker.setPosition(mouseEvent.latLng);
            setSelected(false);
            searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    let address = result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
                    document.getElementById("road_address").innerHTML = address;
                    latlngadd.push(address);
                    setConvey_data(latlngadd);
                }
            });
        });
    },[find])

    return (
            <Row>
                <Col xs={{span:22, offset:1}} md={{span:14, offset:5}} xl={{span:8,offset:8}} xxl={{span:6, offset:9}} style={{ margin: "0 auto", border: "1px solid #dadce0", borderRadius: "8px", padding:"30px 10px" }}>
                    <Row gutter={[0, 16]}>
                        <Col style={{ width: '100%', textAlign: "center" }}>
                            <Typography.Title level={3} style={{ color: "#202124" }}>구장 등록하기</Typography.Title>
                            <Typography style={{ color: "#202124", fontWeight: "normal" }}>구장 위치 찾기</Typography>
                            <Typography.Text type="warning"><QuestionCircleOutlined />지도를 클릭하여 정확한 위치를 설정하여 주세요</Typography.Text>
                            <Input.Search placeholder="위치를 검색해보세요" style={{width:'70%'}} onSearch={value=>setFind(value)}></Input.Search>
                        </Col>
                    </Row>
                    <Row gutter={[0, 16]}>
                        <Col span={22} offset={1}>
                            <div id="register_map" style={{width:"100%", height:"60vh"}}>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16} offset={1}>
                            <Tooltip placement="topRight" title="해당 위치가 맞다면 다음단계를 클릭하여 주세요">
                                <span id="road_address" style={{color:"#696969"}}></span>
                            </Tooltip>
                        </Col>
                        <Col span={6} style={{textAlign:"center"}}>
                            <Button type="primary" shape="round" htmlType="button" onClick={onSubmitForm} disabled={seleted}>다음단계</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
    );
}

export default Apply;