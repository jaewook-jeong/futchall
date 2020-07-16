import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Input, Divider, message, Tooltip } from 'antd';

import styles from '../SCSS/messenger.module.scss';

const Talk = (props) => {
  const dispatch = useDispatch();
  const { opponent } = props;
  const { me, isLoggedIn } = useSelector((state) => state.user,
    (left, right) => { if (left.me.id === right.me.id) { return true; } return false; });
  // const {talkData} = useSelector(state => state.messenger);
  const talkData = [{ id: 'everest88', data: [{ content: '안녕하세요', date: '2020-06-23 17:23' }] }, { id: 'suyeon9456', data: [{ content: 'ㅎㅇㅎㅇ', date: '2020-06-23 17:24' }] }, { id: 'suyeon9456', data: [{ content: '경기하실래요?', date: '2020-06-23 17:24' }] }, { id: 'everest88', data: [{ content: 'ㄱㄱ', date: '2020-06-23 17:26' }] }, { id: 'everest88', data: [{ content: '언제하실?', date: '2020-06-23 17:26' }] }, { id: 'everest88', data: [{ content: '우리는 토욜 가능', date: '2020-06-23 17:27' }] }];
  useEffect(() => {
    // dispatch({type:})
    if (!isLoggedIn) { message.warn('경고에요!'); }
    console.log('------------------------------------');
    console.log(opponent);
    console.log('------------------------------------');
  }, []);

  const sortingForShow = (data) => {
    let tempTalkData = [];
    let id = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const temp of data) {
      if (temp.id === id) {
        const oriData = tempTalkData.pop();
        oriData.data.push(temp.data[0]);
        tempTalkData.push(oriData);
      } else {
        tempTalkData.push(temp);
        id = temp.id;
      }
    }
    return tempTalkData;
  };

  const showData = (
    sortingForShow(talkData).map((v) => {
      if (v.id === me.userId) {
        return (
          <div className={styles.myMsg}>
            {v.data.map((val, i) => (
              <Tooltip
                placement="bottomRight"
                title={val.date}
                key={i}
              >
                <Row justify="end">
                  <Col>{val.content}</Col>
                </Row>
              </Tooltip>
            ))}
          </div>
        );
      }
      return (
        <div className={styles.yourMsg}>
          {v.data.map((val, i) => (
            <Tooltip
              placement="bottomLeft"
              title={val.date}
              key={i}
            >
              <Row justify="start">
                <Col>{val.content}</Col>
              </Row>
            </Tooltip>
          ))}
        </div>
      );
    })
  );

  return (
    <Row>
      <Col span={24}>
        <Row>
          <Col span={24}>
            {showData}
          </Col>
        </Row>
        <Divider />
        <Row>
          <Input
            allowClear
            addonAfter="보내기"
          />
        </Row>
      </Col>
    </Row>
  );
};

Talk.propTypes = {
  opponent: PropTypes.string.isRequired,
};

export default Talk;
