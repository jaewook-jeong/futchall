import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Calendar, Checkbox, Col, Drawer, Popconfirm, Row, Tooltip } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { GET_CALENDAR_REQUEST, SET_CALENDAR_REQUEST } from '../reducers/team';

const TeamCalendar = ({ setVisible, teamId, visible }) => {
  const { calendar, isGettedCalendar } = useSelector((state) => state.team);
  const { me } = useSelector((state) => state.user);
  const [yearMonth, setYearMonth] = useState(moment().format('YYYY-MM-01'));
  const dispatch = useDispatch();
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);
  const SortingData = (list) => {
    const sortedData = {};
    if (isGettedCalendar) {
      list.forEach((value) => {
        if (sortedData[value.date]) {
          sortedData[value.date].push(value);
        } else {
          sortedData[value.date] = [value];
        }
      });
    }
    return sortedData;
  };
  const sortedDate = useMemo(() => SortingData(calendar), [calendar]);
  const disabledDate = useCallback((current) => current && current < moment().endOf('day'), []);
  
  const dateCellRender = (value) => {
    const data = sortedDate[value.format('YYYY-MM-DD')];
    const morning = data?.filter((v) => v.possible === '0');
    const afternoon = data?.filter((v) => v.possible === '1');
    const night = data?.filter((v) => v.possible === '2');
    const [checkedList, setCheckedList] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const onChangeList = useCallback((date) => (list) => {
      setSelectedDate(date);
      setCheckedList(list);
    }, []);
    const onConfirm = useCallback(() => {
      console.log(checkedList, selectedDate);
      dispatch({
        type: SET_CALENDAR_REQUEST,
        data: {
          date: selectedDate,
          possible: checkedList,
        },
      });
      setCheckedList([]);
    }, [checkedList, selectedDate]);
    const onCancel = useCallback(() => {
      setCheckedList([]);
    }, []);
    const defaultValue = [];
    if (morning?.filter((v) => v.UserId === me.id).length === 1) defaultValue.push('0');
    if (afternoon?.filter((v) => v.UserId === me.id).length === 1) defaultValue.push('1');
    if (night?.filter((v) => v.UserId === me.id).length === 1) defaultValue.push('2');
    return (
      <Row>
        {
          moment().diff(value.toString(), 'days') <= 0 && (
            <Col span={24}>
              <Popconfirm
                title={(
                  <Checkbox.Group
                    onChange={onChangeList(value.format('YYYY-MM-DD'))}
                    defaultValue={defaultValue}
                  >
                    <Row>
                      <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                        <Checkbox value="0">오전</Checkbox>
                      </Col>
                      <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                        <Checkbox value="1">오후</Checkbox>
                      </Col>
                      <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                        <Checkbox value="2">저녁</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                )}
                icon={null}
                // onVisibleChange={onCancel}
                onConfirm={onConfirm}
                okText="참석"
                cancelText="취소"
              >
                <Button block size="small">참석</Button>
              </Popconfirm>
            </Col>
          )
        }
        {
          data && (
            <>
              <Col span={24}>
                {
                  morning.length !== 0 && (
                    <Tooltip title={morning.map((v) => v.User.nickname).join(' ')}>오전 : {morning.length}명</Tooltip>
                  )
                }
              </Col>
              <Col span={24}>
                {
                  afternoon.length !== 0 && (
                    <Tooltip title={afternoon.map((v) => v.User.nickname).join(' ')}>오후 : {afternoon.length}명</Tooltip>
                  )
                }
              </Col>
              <Col span={24}>
                {
                  night.length !== 0 && (
                    <Tooltip title={night.map((v) => v.User.nickname).join(' ')}>저녁 : {night.length}명</Tooltip>
                  )
                }
              </Col>
            </>
          )
        }
      </Row>
    );
  };
  const onSelectDate = useCallback((date) => {
    if (yearMonth !== date.format('YYYY-MM-01')) {
      setYearMonth(date.format('YYYY-MM-01'));
    }
  }, [yearMonth]);

  useEffect(() => {
    dispatch({
      type: GET_CALENDAR_REQUEST,
      data: {
        teamId,
        startDate: yearMonth,
        endDate: moment(yearMonth, 'YYYY-MM-DD').endOf('month').format('YYYY-MM-DD'),
      },
    });
  }, [yearMonth]);
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
        // disabledDate={disabledDate}
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
