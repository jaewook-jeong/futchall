import React, { useCallback, useEffect, useState, useRef } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { Col, Row, Typography, Button, Tooltip, Input, message } from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
// import {getLocation} from '../../../util/getLocation';
const Apply = () => {
    // const { latitude, longitude } = useSelector(state => state.location);
    const { isLoggedIn } = useSelector(state => state.user);
    const [seleted, setSelected] = useState(true);
    const [convey_data, setConvey_data] = useState([]);
    let kakaoMap = useRef();
    let kakaoMarker = useRef();
    // useEffect(()=>{
    //     if (!isLoggedIn) {
    //         message.error("로그인 후 이용하여주세요")
    //         Router.push(`/stadia`);
    //     }
    // },[])
    

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        Router.push(`/stadium/register/details?data=${convey_data}`, '/stadium/register/details');
    },[convey_data])

    const searchDetailAddrFromCoords = useCallback((coords, callback)=>{
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    },[])

    //지도 만드는 로직
    useEffect(()=>{
        const latitude = '37.5665', longitude = '126.9780';
        const options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 9
        };
        const temp = new kakao.maps.Map(document.getElementById("register_map"), options);
        temp.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
        const zoomControl = new kakao.maps.ZoomControl();
        temp.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        
        kakao.maps.event.addListener(temp, 'click', function(mouseEvent) {
            if(kakaoMarker.current === undefined){
                kakaoMarker.current = new kakao.maps.Marker({ 
                    position: mouseEvent.latLng
                }); 
                kakaoMarker.current.setMap(temp);
                
            }
            let latlngadd = [mouseEvent.latLng.getLat(), mouseEvent.latLng.getLng()];
            kakaoMarker.current.setPosition(mouseEvent.latLng);
            setSelected(false); //마커로 위치를 선택했는지 여부
            searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    //주소를 띄우는 로직
                    let address = result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
                    document.getElementById("road_address").innerHTML = address;
                    latlngadd.push(address);
                    setConvey_data(latlngadd);
                }
            });
        });
        kakaoMap.current = temp;
        return kakaoMap.current.relayout();
    },[])

    //검색했을 때 만들어둔 지도만 바뀌는 로직
    const searchLocation = useCallback((value)=>{
        if(value != ''){
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(value, function(result, status){
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    kakaoMarker.current?.setMap(null);
                    setSelected(true); //새로 검색했을 경우 저장된 주소와 검색위치 마커가 다르기 때문에 못 넘어가게 해주자
                    document.getElementById("road_address").innerHTML = '';
                    kakaoMarker.current = new kakao.maps.Marker({
                    map: kakaoMap.current,
                    position: coords
                    });
                    kakaoMap.current.setCenter(coords);
                }
            })
        }
    },[])

    return (
            <Row>
                <Col xs={{span:22, offset:1}} md={{span:14, offset:5}} xl={{span:8,offset:8}} xxl={{span:6, offset:9}} style={{ margin: "0 auto", border: "1px solid #dadce0", borderRadius: "8px", padding:"30px 10px" }}>
                    <Row gutter={[0, 16]}>
                        <Col style={{ width: '100%', textAlign: "center" }}>
                            <Typography.Title level={3} style={{ color: "#202124" }}>구장 등록하기</Typography.Title>
                            <Typography style={{ color: "#202124", fontWeight: "normal" }}>구장 위치 찾기</Typography>
                            <Typography.Text type="warning"><QuestionCircleOutlined />지도를 클릭하여 정확한 위치를 설정하여 주세요</Typography.Text>
                            <Input.Search placeholder="위치를 검색해보세요" style={{width:'70%'}} onSearch={value=>searchLocation(value)}></Input.Search>
                        </Col>
                    </Row>
                    <Row gutter={[0, 16]}>
                        <Col span={22} offset={1}>
                            <div id="register_map" style={{width:"100%", height:"60vh"}}/>
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