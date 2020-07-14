import React, {useEffect} from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router'
import { Skeleton, Col, Row, Tabs, Button, message, Descriptions, Typography, Table, Tag } from 'antd';
import { SELECT_TEAM_REQUEST }from '../../reducers/team';
import { QuestionCircleOutlined } from '@ant-design/icons';
import AppLayout from '../../components/AppLayout';
const Stadium = () =>{
    const router = useRouter();
    const { id } = router.query;
    const { info, isSelected, memberList } = useSelector(state => state.team, (left, right)=>{if(left['info']['req'] == right['info']['req']){return true}else{return false}});
    const {me, isLoggedIn } = useSelector(state => state.user, (left, right)=>{ if (left['me']['id'] == right['me']['id']){return true}else{return false}});
    const dispatch = useDispatch();
    
    const memberColumns = [
        {
            title: '주장',
            dataIndex: 'reader',
            align: 'center',
            width: 70,
            render: (val)=><span>{val?"*":""}</span>
        },
        {
            title: '닉네임',
            dataIndex: 'nickname',
            align: 'center',
            sorter: (a,b)=>a.nickname - b.nickname,
        },
        {
            title: '포지션',
            dataIndex: 'positions',
            align: 'center',
            render: (val)=> <div>{val.map((v)=><Tag key={v} color={v=='FIXO'?'blue':v==='ALA'?'green':v==='PIVO'?'red':'orange'}>{v}</Tag>)}</div>,
            filters:[
                {text:'PIVO',value:'PIVO'},
                {text:'ALA',value:'ALA'},
                {text:'FIXO',value:'FIXO'},
                {text:'GOLEIRO',value:'GOLEIRO'},
            ],
            onFilter:(value, rec)=>rec.positions.indexOf(value) != -1,
        },
        {
            title: '득점',
            dataIndex: 'score',
            align: 'center',
            sorter: (a,b)=>a.score - b.score,
        },
        {
            title: '연락하기',
            dataIndex: 'id',
            align: 'center',
            render: (val)=> <div><a onClick={()=>console.log(val)}>연락하기</a></div>
        },
    ]
    const recordColumns= [
        {
            title: 'Home',
            children:[
                {
                    title:'점령팀',
                    dataIndex: 'homeTeamName',
                    align: 'center'
                },
                {
                    title:'득점',
                    dataIndex: 'homeTeamScore',
                    align: 'center'
                }
            ]
        },
        {
            title: 'Away',
            children:[
                {
                    title:'도전팀',
                    dataIndex: 'awayTeamName',
                    align: 'center'
                },
                {
                    title:'득점',
                    dataIndex: 'awayTeamScore',
                    align: 'center'
                }
            ]
        },
        {
            title: '일시',
            dataIndex: 'date',
            align: 'center'
        },
        {
            title: '장소',
            dataIndex: 'satdiumName',
            align: 'center'
        }
    ]
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
        <AppLayout>
            <Row gutter={[0, 16]} >
                <Col xs={{ span: 22, offset:1 }} sm={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }}>
                    <Typography.Title level={3} copyable={isSelected && {text:window.location.pathname}}>
                        <Skeleton loading={!isSelected} active paragraph={false}/>
                        {isSelected && info.title}
                    </Typography.Title>
                    <Tabs tabBarExtraContent={(isSelected && isLoggedIn && (info.req === me.Team.club))? <Button onClick={()=>{message.warn("준비중입니다.")}} shape="round"><QuestionCircleOutlined />팀 관리</Button> :null}>
                        <Tabs.TabPane tab="상세정보" key="1" >
                            <Descriptions
                            column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
                            bordered={true}
                            size="middle"
                            >
                                <Descriptions.Item label="활동 지역">
                                    <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && info.location}
                                </Descriptions.Item>
                                <Descriptions.Item label="모임 시간">
                                    <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && info.time}
                                </Descriptions.Item>
                                <Descriptions.Item label="모집 여부">
                                <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && info.recruit}
                                </Descriptions.Item>
                                <Descriptions.Item label="소개" span={2}>
                                <Skeleton loading={!isSelected} active paragraph={false}/>
                                    {isSelected && <Typography.Paragraph ellipsis={{rows:1, expandable:true}}>{info.description}</Typography.Paragraph>}
                                </Descriptions.Item>
                            </Descriptions>
                            <div id="stadiumAddress" style={{width:'100%', height:'500px', marginTop:'10px'}}></div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="선수 명단" key="2">
                            <Skeleton active loading={!isSelected}></Skeleton>
                            {isSelected &&
                                <Table
                                    showHeader={true}
                                    columns={memberColumns}
                                    pagination={{pageSize:15}}
                                    scroll={{ x: 'max-content', scrollToFirstRowOnChange:true }}
                                    dataSource={memberList}
                                    rowKey={(memberList)=>{return memberList.id}}
                                >

                                </Table>
                            }
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="전적" key="3">
                            <Skeleton active loading={!isSelected}></Skeleton>
                            {isSelected && 
                                <Table
                                    showHeader={true}
                                    columns={recordColumns}
                                    dataSource={info.record}
                                >
                                </Table>
                            }
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="사진" key="4">
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