import React, {useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router'
import {Skeleton, Col, Row, Tabs, Button, message, Descriptions, Tag, Typography, Tooltip} from 'antd';
import StadiumComment from '../../components/StadiumComment';
import {SELECT_STADIUM_REQUEST}from '../../reducers/stadium';
import { CopyOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import styles from '../../SCSS/stadium.module.scss'
import AppLayout from '../../components/AppLayout';
const Stadium = () =>{
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query
    const { info, isSelected } = useSelector(state => state.stadium, (left, right)=>{if(left['info']['req'] == right['info']['req']){return true}else{return false}});
    useEffect(
        ()=>{
            dispatch({type:SELECT_STADIUM_REQUEST, data:{req:id}});
        }
    ,[]);
    useEffect(()=>{
        if(isSelected){
            const options = {
                center: new kakao.maps.LatLng(info.lat, info.lng),
                level: 3
            };
            const map = new kakao.maps.Map(document.getElementById("stadiumAddress"), options);
            map.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
            const marker = new kakao.maps.Marker(
                {
                    map: map,
                    position: new kakao.maps.LatLng(info.lat, info.lng)
                }
            )
            const overlayFrame = `<div class=${styles.overlaybox}>
                <div class=${styles.boxtitle} id="whatShouldIDo">구장 점령 팀</div>
                <div class=${styles.first} >
                    <img src=${info.teamImg}>
                    <div class=${styles.triangle}>1</div>
                    <div class=${styles.movietitle}>${info.team}</div>
                </div>
            </div>`

            var customOverlay = new kakao.maps.CustomOverlay({
                position: marker.getPosition(),
                content: overlayFrame,
                xAnchor: 0.5,
                yAnchor: 1.3
            });
            
            // 커스텀 오버레이를 지도에 표시합니다
            customOverlay.setMap(map);

            //오버레이 클릭시 팀으로 이동하고 싶은데 위에 overlayFrame에 그대로 넣으면 대부분의 방식에서 "function" 이런식으로 해석되어 버림
            document.getElementById('whatShouldIDo').onclick = moveToTeam;
        }
    },[isSelected])

    const moveToTeam = useCallback(() =>{
        Router.push(`/team/${info.teamInfo}`);
    },[info])
    return(
        <AppLayout>
            <Row gutter={[0, 16]} >
                <Col xs={{ span: 22, offset:1 }} sm={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }}>
                    <Typography.Title level={3}>
                        <Skeleton loading={!isSelected} active paragraph={false}/>
                        {isSelected && info.title}
                        {isSelected && <Button onClick={()=>{message.info("링크가 복사되었습니다.")}} type="link"><CopyOutlined />Copy</Button>}
                    </Typography.Title>
                    <Tabs  tabBarExtraContent={<Button onClick={()=>{message.warn("준비중입니다.")}} shape="round"><QuestionCircleOutlined />정보수정</Button> }>
                        <Tabs.TabPane tab="상세정보" key="1" >
                            <Descriptions
                            column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
                            bordered={true}
                            size="small"
                            >
                                <Descriptions.Item label="주소">
                                    <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && info.address}
                                </Descriptions.Item>
                                <Descriptions.Item label="사용시간">
                                    <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && info.time}
                                </Descriptions.Item>
                                    <Descriptions.Item label="라이트 여부">
                                <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && info.light}
                                </Descriptions.Item>
                                <Descriptions.Item label="특징">
                                    <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && info.special.map((c) => {
                                        return (<Tag key={c}>#{c}</Tag>)
                                    })}
                                </Descriptions.Item>
                                <Descriptions.Item label="소개" span={2} >
                                <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && <Typography.Paragraph ellipsis={{rows:1, expandable:true, symbol:<span>"더보기"</span>}}>{info.description}</Typography.Paragraph>}
                                </Descriptions.Item>
                                <Descriptions.Item label="점령 팀">
                                <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && <a onClick={moveToTeam}>{info.team}</a>}
                                </Descriptions.Item>
                                <Descriptions.Item label={<>유효기간 <Tooltip title="점령 후 도전을 받지 않을 시 유지되는 기간입니다."><QuestionCircleOutlined/></Tooltip></>} >
                                    <Skeleton loading={!isSelected} active paragraph={false}/>
                                        {isSelected && info.valid}
                                </Descriptions.Item>
                            </Descriptions>
                            <div id="stadiumAddress" style={{width:'100%', height:'70vh', marginTop:'10px'}}></div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="후기" key="2">
                                <Skeleton active loading={!isSelected}></Skeleton>
                                {isSelected && <StadiumComment/>}
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
        </AppLayout>
    );
}
export default Stadium;