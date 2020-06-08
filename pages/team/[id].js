import React, {useEffect} from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { Skeleton, Col, Row, Tabs, Button, message, Descriptions, Typography } from 'antd';
import { SELECT_TEAM_REQUEST }from '../../reducers/team';
import { QuestionCircleOutlined } from '@ant-design/icons';
const Stadium = () =>{
    const router = useRouter();
    const { id } = router.query;
    const { info, isSelected } = useSelector(state => state.team);
    const {me, isLoggedIn } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(
        // have to change method to getInitialProps
        ()=>{
            dispatch({type:SELECT_TEAM_REQUEST, data:{req:id}});
        }
    ,[]);
    useEffect(()=>{
        if(isSelected){
            const points = info.captures.map(obj=>{
                return new kakao.maps.LatLng(obj.lat, obj.lng);
            })
            const options = {
                center: new kakao.maps.LatLng(38, 127.30),
                level: 5
            };
            const map = new kakao.maps.Map(document.getElementById("stadiumAddress"), options);
            map.setDraggable(false);
            map.setZoomable(false);
            let bounds = new kakao.maps.LatLngBounds();
            for (let i = 0; i < points.length; i++) {
                let marker = new kakao.maps.Marker({ position : points[i], clickable : true });
                marker.setMap(map);
                kakao.maps.event.addListener(marker, 'click', function() {
                    Router.push(`/stadium/${info.captures[i].req}`);
                });
                bounds.extend(points[i]);
            }
            map.setBounds(bounds);
        }
    },[isSelected])
    return(
        <div>
            <Row gutter={[0, 16]} >
                <Col xs={{ span: 22, offset:1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }}>
                    <Typography.Title level={3} copyable={isSelected && {text:window.location.pathname}}>
                        <Skeleton loading={!isSelected} active paragraph={false}/>
                        {isSelected && info.title}
                    </Typography.Title>
                    <Tabs tabBarExtraContent={(isSelected && isLoggedIn && (info.req === me.club))? <Button onClick={()=>{message.warn("준비중입니다.")}} shape="round"><QuestionCircleOutlined />팀 관리</Button> :null}>
                        <Tabs.TabPane tab="상세정보" key="1" >
                            <Descriptions
                            column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
                            bordered={true}
                            size="middle"
                            >
                                <Descriptions.Item label="주 활동 지역">
                                    <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && info.location}
                                </Descriptions.Item>
                                <Descriptions.Item label="주 모임 시간">
                                    <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && info.time}
                                </Descriptions.Item>
                                <Descriptions.Item label="모집 여부">
                                <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && info.recruit}
                                </Descriptions.Item>
                                <Descriptions.Item label="소개" span={2}>
                                <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && info.description}
                                </Descriptions.Item>
                            </Descriptions>
                            <div id="stadiumAddress" style={{width:'100%', height:'500px', marginTop:'10px'}}></div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="전적" key="2">
                                <Skeleton active loading={!isSelected}></Skeleton>
                                {isSelected && info.record}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="사진" key="3">
                                <Skeleton active></Skeleton>
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 22, offset:1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }}>
                </Col>
            </Row>
        </div>
    );
}
export default Stadium;