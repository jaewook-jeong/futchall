import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import { Drawer, List, Collapse, Skeleton, Avatar, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { GET_LIST_REQUEST, DELETE_LIST_REQUEST } from '../reducers/messenger';
import Talk from './Talk';

const Message = (props) => {
  const dispatch = useDispatch();
  const { visible, setVisible } = props;
  const { list, isGettingList, originalId } = useSelector((state) => state.messenger, shallowEqual);

  useEffect(() => {
    if (visible) {
      dispatch({
        type: GET_LIST_REQUEST,
        data: originalId,
      });
    }
  }, [visible]);

  const onHandleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const deleteTalkData = (id) => (
    <Popconfirm
      placement="bottomRight"
      title="대화내용을 삭제하시겠습니까?"
      okText="네"
      cancelText="아니오"
      onConfirm={(event) => {
        dispatch({
          type: DELETE_LIST_REQUEST,
          data: {
            id: originalId,
            delUser: id,
          },
        });
        event.stopPropagation();
        message.success('대화내용이 삭제되었습니다.');
      }}
    >
      <DeleteOutlined style={{ fontSize: '20px', lineHeight: '40px', color: '#e66767' }} onClick={(event) => { event.stopPropagation(); }} />
    </Popconfirm>
  );
  return (
    <Drawer
      title="Message"
      placement="right"
      onClose={onHandleClose}
      visible={visible}
      width="350px"
    >
      <List
        itemLayout="horizontal"
        dataSource={list}
        split={false}
        loading={isGettingList}
        renderItem={(item) => (
          <List.Item
            style={{ padding: '5px 0' }}
          >
            <Skeleton avatar title paragraph={false} loading={isGettingList} active>
              <Collapse
                style={{ width: '100%' }}
                expandIconPosition="left"
              >
                <Collapse.Panel
                  header={<span><Avatar shape="circle" size="large">{item.clubname} </Avatar> { item.nickname}</span>}
                  extra={deleteTalkData(`${item.id}`)}
                  key={item.id}
                >
                  <Talk opponent={item.id} />
                </Collapse.Panel>
              </Collapse>
            </Skeleton>
          </List.Item>
        )}
      />
    </Drawer>
  );
};

Message.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};
export default Message;
