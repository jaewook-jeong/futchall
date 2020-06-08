import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Menu, Input, Button, Row, Col, Affix, message, } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './LoginForm';
import ProfileAvatar from './ProfileAvatar';
import { LOG_OUT_REQUEST } from '../reducers/user';
import Message from './Message';
import { HomeOutlined, MessageFilled, UserAddOutlined, PlusSquareOutlined, LineChartOutlined } from '@ant-design/icons';
import { SEARCH_TEAMS_REQUEST } from '../reducers/team';

const AppLayout = ({ children }) => {
    const { isLoggedIn, me } = useSelector(state => state.user);
    const [visible, setVisible] = useState(false);
    const [chatVisible, setChatVisible] = useState(false);
    const Router = useRouter();
    const dispatch = useDispatch();
    
    const showModal = () => setVisible(true); 
    const popRightMessage = () => setChatVisible(true);

    const onLogOut = useCallback(() => {
        dispatch({type: LOG_OUT_REQUEST});
    }, []);
    const onApply = () => {
        !isLoggedIn ? message.info("로그인 후 등록할 수 있습니다.") : Router.push('/stadium/register/location');
    }
    const searchTeam = (value, event) => {
        event.preventDefault();
        dispatch({
            type:SEARCH_TEAMS_REQUEST, 
            data:{"query": value},
        });
        Router.push(`/team/search?q=${value}`);
    }
    return (
        <Row id="mainContainer">
            <Col xs={{ span: 24 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }}>
                <Menu mode="horizontal" style={{ marginBottom: '20px' }} defaultSelectedKeys="home" >
                    <Menu.Item key="home" ><Link href="/stadia"><a><HomeOutlined />구장깨기</a></Link></Menu.Item>
                    <Menu.Item key="ranking" ><Link href="/team/ranking"><a><LineChartOutlined />순위보기</a></Link></Menu.Item>
                    <Menu.Item key="location">
                        <Input.Search enterButton style={{ verticalAlign: 'middle' }} placeholder="팀 검색하기" onSearch={searchTeam}/>
                    </Menu.Item>
                    <Menu.Item onClick={onApply} key="applyStadium"><PlusSquareOutlined />신규구장 등록하기</Menu.Item>
                    {isLoggedIn && !me.club && <Menu.Item key="makeTeam"><Link href="/team/register"><a>팀 생성하기</a></Link></Menu.Item>}
                    {isLoggedIn && me.club && <Menu.Item key="Team"><Link href="/team/[id]" as={`/team/${me.club}`} ><a>팀 관리</a></Link></Menu.Item>}
                    {isLoggedIn && <Menu.Item key="logout" onClick={onLogOut} style={{ float: "right" }}>로그아웃</Menu.Item>}
                    {isLoggedIn && <Menu.Item key="profile" style={{ float: "right" }}><ProfileAvatar/></Menu.Item>}
                    {!isLoggedIn && <Menu.Item key="login_modal" onClick={showModal} style={{ float: "right" }}>로그인</Menu.Item>}
                    {!isLoggedIn && <Menu.Item key="signup" style={{ float: "right" }}><Link href="/signup"><a><UserAddOutlined />회원가입</a></Link></Menu.Item>}
                </Menu>
                <LoginForm visible={visible} setVisible={setVisible} />
            </Col>
            <Col span={24}>
                {children}
            </Col>
            {isLoggedIn && <Affix 
                            target={() => document.getElementById("mainContainer")} 
                            style={{ position: "fixed", right: '5vw', bottom: '10vh', zIndex:1000 }} >
                                <Button type="primary" shape="circle" size="large" icon={<MessageFilled />}onClick={popRightMessage} ></Button> 
                            </Affix>
            }
            {isLoggedIn && <Message visible={chatVisible} setVisible={setChatVisible}/>}
        </Row>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node,
};

export default AppLayout;