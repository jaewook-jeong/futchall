import React, { useState, useCallback} from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Menu, Button, Affix, message, Layout} from 'antd';
import { useSelector, shallowEqual } from 'react-redux';
import LoginForm from './LoginForm';
import Message from './Message';
import { MessageFilled, UserAddOutlined, PlusSquareOutlined, LineChartOutlined, CompassOutlined, TeamOutlined } from '@ant-design/icons';
import HeaderMenu from './HeaderMenu';

const AppLayout = ({ children }) => {
    const { isLoggedIn, me } = useSelector(state => state.user, shallowEqual);
    const [visible, setVisible] = useState(false);
    const [chatVisible, setChatVisible] = useState(false);
    const Router = useRouter();
    
    const showModal = useCallback(() => setVisible(!visible),[]); 
    const popRightMessage = useCallback(() => setChatVisible(!chatVisible),[]);
    
    const onApply = useCallback(() => {
        isLoggedIn ? Router.push('/stadium/register/location') : message.info("로그인 후 등록할 수 있습니다.");
    },[]);

    return (
        <Layout style={{minHeight : '100vh', maxWidth : '1920px', width : '100vw'}} >
            <Layout.Header style={{backgroundColor:'#fff', padding:'0 5px'}}>
                <HeaderMenu showModal={showModal}/>
            </Layout.Header>
            <Layout.Content style={{height:'5px', backgroundColor:'#fff'}}></Layout.Content>
            <Layout style={{backgroundColor:"#fff"}} hasSider={true}>
                <Layout.Sider breakpoint={"sm"} theme="light" zeroWidthTriggerStyle={{top:'-30px'}} collapsedWidth={0}>
                    <Menu mode="inline" theme="light" >
                        <Menu.Item key="stadia" icon={<CompassOutlined/>} onClick={()=>Router.push("/stadia")}>구장찾기</Menu.Item>
                        <Menu.Item key="ranking" icon={<LineChartOutlined/>} onClick={()=>Router.push("/team/ranking")}>순위보기</Menu.Item>
                        <Menu.Item onClick={onApply} key="applyStadium" icon={<PlusSquareOutlined/>}>신규구장 등록하기</Menu.Item>
                        {isLoggedIn && !me.club && <Menu.Item key="makeTeam"><Link href="/team/register"><a>팀 생성하기</a></Link></Menu.Item>}
                        {isLoggedIn && me.club && <Menu.Item key="Team" icon={<TeamOutlined/>} onClick={()=>Router.push("/team/[id]",`/team/${me.club}`)}>팀 관리</Menu.Item>}
                        {!isLoggedIn && <Menu.Item key="signup" icon={<UserAddOutlined/>} onClick={()=>Router.push("/signup")}>회원가입</Menu.Item>}
                    </Menu>
                </Layout.Sider>
                <Layout.Content style={{minHeight:'94vh', zIndex:5}}>
                    {children}
                </Layout.Content>
            </Layout>
            
            {isLoggedIn && <Affix 
                        // target={() => document.getElementById("mainContainer")} 
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