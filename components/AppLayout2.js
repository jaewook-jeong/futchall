import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Affix, Layout, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { MessageFilled } from '@ant-design/icons';
import styled from 'styled-components';

import LoginForm from './LoginForm';
import Message from './Message';
import HeaderMenu from './HeaderMenu';

const OutterLayout = styled(Layout)`
    min-height: 100vh;
    max-width: 1920px;
    background-color: #fff;
`;
const LayoutHeader = styled(Layout.Header)`
    background-color: #fff;
    padding: 0 5px;
`;
const LayoutContent = styled(Layout.Content)`
    background-color: #eaeaea;
    height: 3px;
`;
const MainLayout = styled(Layout.Content)`
    min-height: 94vh;
    padding-top: 5px;
    z-index: 5;
`;
const MessageAffix = styled(Affix)`
    position: fixed;
    right: 5vw;
    bottom: 10vh;
    z-index: 1000;
`;
const AppLayout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);

  const showModal = useCallback(() => setVisible(!visible), []);
  const popRightMessage = useCallback(() => setChatVisible(!chatVisible), []);
  useEffect(() => {
    if (isLoggedIn) {
      setVisible(false);
    }
  }, [isLoggedIn]);
  return (
    <OutterLayout>
      <LayoutHeader>
        <HeaderMenu showModal={showModal} shrink />
      </LayoutHeader>
      <LayoutContent />
      <MainLayout>
        <Row>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 22, offset: 1 }}
            md={{ span: 20, offset: 2 }}
            lg={{ span: 20, offset: 2 }}
            xl={{ span: 20, offset: 2 }}
          >
            {children}
          </Col>
        </Row>
      </MainLayout>

      {isLoggedIn
                  && (
                  <MessageAffix>
                    <Button type="primary" shape="circle" size="large" icon={<MessageFilled />} onClick={popRightMessage} />
                  </MessageAffix>
                  )}
      {!isLoggedIn && <LoginForm visible={visible} setVisible={setVisible} />}
      {isLoggedIn && <Message visible={chatVisible} setVisible={setChatVisible} />}
    </OutterLayout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
