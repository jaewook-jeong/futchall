import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { Menu, Input, Button, Row, Col, Affix, message, Layout} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './LoginForm';
import ProfileAvatar from './ProfileAvatar';
import { LOG_OUT_REQUEST } from '../reducers/user';
import Message from './Message';
import { HomeOutlined, MessageFilled, UserAddOutlined, PlusSquareOutlined, LineChartOutlined, SearchOutlined, CompassOutlined, KeyOutlined, TeamOutlined, StopOutlined } from '@ant-design/icons';
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
        message.info("정상적으로 로그아웃되었습니다.")
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
    // console.log(visible,"visible변수", isLoggedIn, "이건 isloggedIn변수")
    useEffect(()=>{
            if(isLoggedIn){
            setVisible(false);
        }
    },[isLoggedIn])
    return (
        <Layout style={{minHeight : '100vh', maxWidth : '1920px', width : '100vw'}}>
            <Layout.Sider breakpoint={"sm"} >
                <Menu mode="inline" theme="dark" >
                    <Menu.Item key="main" icon={<HomeOutlined/>} onClick={()=>Router.push("/")}>FUTCHALL</Menu.Item>
                    <Menu.Item key="stadia" icon={<CompassOutlined/>} onClick={()=>Router.push("/stadia")}>구장찾기</Menu.Item>
                    <Menu.Item key="ranking" icon={<LineChartOutlined/>} onClick={()=>Router.push("/team/ranking")}>순위보기</Menu.Item>
                    <Menu.Item key="search" icon={<SearchOutlined/>}>팀 검색하기</Menu.Item>
                    <Menu.Item onClick={onApply} key="applyStadium" icon={<PlusSquareOutlined/>}>신규구장 등록하기</Menu.Item>
                    {isLoggedIn && !me.club && <Menu.Item key="makeTeam"><Link href="/team/register"><a>팀 생성하기</a></Link></Menu.Item>}
                    {isLoggedIn && me.club && <Menu.Item key="Team" icon={<TeamOutlined/>} onClick={()=>Router.push("/team/[id]",`/team/${me.club}`)}>팀 관리</Menu.Item>}
                    {isLoggedIn && <Menu.Item key="profile" icon={<ProfileAvatar/>}></Menu.Item>}
                    {isLoggedIn && <Menu.Item key="logout" onClick={onLogOut} icon={<StopOutlined/>}>로그아웃</Menu.Item>}
                    {!isLoggedIn && <Menu.Item key="login_modal" onClick={showModal} icon={<KeyOutlined/>}>로그인</Menu.Item>}
                    {!isLoggedIn && <Menu.Item key="signup" icon={<UserAddOutlined/>} onClick={()=>Router.push("/signup")}>회원가입</Menu.Item>}
                </Menu>
            </Layout.Sider>
            <Layout style={{backgroundColor:"#fff"}}>
                <Layout.Header style={{height:'7vh', backgroundColor:"#fff"}}>
                </Layout.Header>
                <Layout.Content style={{minHeight:'93vh'}}>
                    {children}
                </Layout.Content>
            </Layout>
            {isLoggedIn && <Affix 
                        target={() => document.getElementById("mainContainer")} 
                        style={{ position: "fixed", right: '5vw', bottom: '10vh', zIndex:1000 }} >
                        <Button type="primary" shape="circle" size="large" icon={<MessageFilled />}onClick={popRightMessage} ></Button> 
                        </Affix>
            }
            {!isLoggedIn && <LoginForm visible={visible} setVisible={setVisible} />}
            {isLoggedIn && <Message visible={chatVisible} setVisible={setChatVisible}/>}
        </Layout>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node,
};

export default AppLayout;