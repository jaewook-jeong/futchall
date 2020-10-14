import React, { useCallback, useEffect } from 'react';
import { Button, Calendar, Col, Drawer, Popconfirm, Row, Select } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { CheckSquareOutlined } from '@ant-design/icons';

import { GET_CALENDAR_REQUEST } from '../reducers/team';

const TeamCalendar = ({ setVisible, teamId, visible }) => {
  const { calendar } = useSelector((state) => state.team);
  const dispatch = useDispatch();
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);
  const dateCellRender = useCallback((value) => {
    console.log(calendar);
    return (
      null
      // <Popconfirm
      // title="참석하시겠습니까?"
      // okText="참석"
      // cancelText="취소"
      // >
      //   <CheckSquareOutlined />
      // </Popconfirm>
    );
  }, []);
  const onSelectDate = useCallback((date) => {
    console.log(date.format('YYYY-MM-DD'));
  });
  const disabledDate = useCallback((current) => current && current < moment().endOf('day'), []);
  useEffect(() => {
    dispatch({
      type: GET_CALENDAR_REQUEST,
      data: {
        teamId,
        startDate: moment().startOf('month').format('YYYY-MM-DD'),
        endDate: moment().endOf('month').format('YYYY-MM-DD'),
      },
    });
  }, []);
  return (
    <Drawer
      title="스케줄 관리"
      placement="left"
      visible={visible}
      onClose={onClose}
      width="90%"
      bodyStyle={{ overflowX: 'hidden' }}
    >
      <Calendar
        locale={{ lang: { locale: 'ko', month: '월', year: '년' }, dateFormat: 'YYYY-MM-DD' }}
        dateCellRender={dateCellRender}
        onSelect={onSelectDate}
      />
    </Drawer>
  );
};

TeamCalendar.propTypes = {
  setVisible: PropTypes.func.isRequired,
  teamId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default TeamCalendar;
