import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import {Skeleton, Col, Row, Tabs, Button, message, Descriptions, Tag, Typography, Tooltip} from 'antd';
import StadiumComment from '../../components/StadiumComment';
import {SELECT_STADIUM_REQUEST}from '../../reducers/stadium';
import { CopyOutlined, QuestionCircleOutlined } from '@ant-design/icons';
const Stadium = () =>{
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = router.query
    const { info, isSelected } = useSelector(state => state.stadium);
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
            //나중에 info에 팀 사진 가져와서 overlay로 띄우자
            const marker = new kakao.maps.Marker(
                {
                    map: map,
                    position: new kakao.maps.LatLng(info.lat, info.lng)
                }
            )

        }
    },[isSelected])
    return(
        <div>
            <Row gutter={[0, 16]} >
                <Col xs={{ span: 22, offset:1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }}>
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
                            size="middle"
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
                                <Descriptions.Item label="소개" span={2}>
                                <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && info.description}
                                </Descriptions.Item>
                                <Descriptions.Item label="점령 팀">
                                <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && <a onClick={()=>{alert(`${info.teamInfo}`)}}>{info.team}</a>}
                                </Descriptions.Item>
                                <Descriptions.Item label={<>유효기간 <Tooltip title="점령 후 도전을 받지 않을 시 유지되는 기간입니다."><QuestionCircleOutlined/></Tooltip></>} >
                                    <Skeleton loading={!isSelected} active paragraph={false}/>
                                        {isSelected && info.valid}
                                </Descriptions.Item>
                            </Descriptions>
                            <div id="stadiumAddress" style={{width:'100%', height:'500px', marginTop:'10px'}}></div>
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
        </div>
    );
}
export default Stadium;