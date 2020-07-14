import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Menu, Button, Affix, message, Layout} from 'antd';
import { useSelector, shallowEqual } from 'react-redux';
import LoginForm from './LoginForm';
import Message from './Message';
import styled from 'styled-components';
import { MessageFilled, UserAddOutlined, PlusSquareOutlined, LineChartOutlined, CompassOutlined, TeamOutlined } from '@ant-design/icons';
import HeaderMenu from './HeaderMenu';

const OutterLayout = styled(Layout)`
    min-height: 100vh;
    max-width: 1920px;
`;
const LayoutHeader = styled(Layout.Header)`
    background-color: #fff;
    padding: 0 5px;
`;
const LayoutContent = styled(Layout.Content)`
    background-color: #fff;
    height: 5px;
`;
const InnerLayout = styled(Layout)`
    background-color: #fff;
`;
const MainLayout = styled(Layout.Content)`
    min-height: 94vh;
    z-index: 5;
`;
const MessageAffix = styled(Affix)`
    position: fixed;
    right: 5vw;
    bottom: 10vh;
    z-index: 1000;
`;
const AppLayout = ({ children }) => {
    const { isLoggedIn, me } = useSelector(state => state.user);
    const [visible, setVisible] = useState(false);
    const [chatVisible, setChatVisible] = useState(false);
    const Router = useRouter();
    
    const showModal = useCallback(() => setVisible(!visible),[]); 
    const popRightMessage = useCallback(() => setChatVisible(!chatVisible),[]);
    const onApply = useCallback(() => {
        isLoggedIn ? Router.push('/stadium/register/location') : message.info("로그인 후 등록할 수 있습니다.");
    },[isLoggedIn]);

    return (
        <OutterLayout>
            <LayoutHeader>
                <HeaderMenu showModal={showModal}/>
            </LayoutHeader>
            <LayoutContent/>
            <InnerLayout hasSider={true}>
                <Layout.Sider breakpoint={"sm"} theme="light" collapsedWidth={0}>
                    <Menu mode="inline" theme="light" >
                        <Menu.Item key="stadia" icon={<CompassOutlined/>} onClick={()=>Router.push("/stadia")}>구장찾기</Menu.Item>
                        <Menu.Item key="ranking" icon={<LineChartOutlined/>} onClick={()=>Router.push("/team/ranking")}>순위보기</Menu.Item>
                        <Menu.Item onClick={onApply} key="applyStadium" icon={<PlusSquareOutlined/>}>신규구장 등록하기</Menu.Item>
                        {isLoggedIn && !me.Team.club && <Menu.Item key="makeTeam"><Link href="/team/register"><a>팀 생성하기</a></Link></Menu.Item>}
                        {isLoggedIn && me.Team.club && <Menu.Item key="Team" icon={<TeamOutlined/>} onClick={()=>Router.push("/team/[id]",`/team/${me.Team.club}`)}>팀 관리</Menu.Item>}
                        {!isLoggedIn && <Menu.Item key="signup" icon={<UserAddOutlined/>} onClick={()=>Router.push("/signup")}>회원가입</Menu.Item>}
                    </Menu>
                </Layout.Sider>
                <MainLayout>
                    {children}
                </MainLayout>
            </InnerLayout>
            
            {isLoggedIn && 
                        <MessageAffix
                            // target={() => document.getElementById("mainContainer")} 
                        >
                            <Button type="primary" shape="circle" size="large" icon={<MessageFilled />}onClick={popRightMessage} ></Button> 
                        </MessageAffix>
            }
            {!isLoggedIn && <LoginForm visible={visible} setVisible={setVisible} />}
            {isLoggedIn && <Message visible={chatVisible} setVisible={setChatVisible}/>}
        </OutterLayout>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;