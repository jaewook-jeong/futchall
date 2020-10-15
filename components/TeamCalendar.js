import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Calendar, Col, Drawer, Popconfirm, Row, Select, Tooltip } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { CheckSquareOutlined } from '@ant-design/icons';

import { GET_CALENDAR_REQUEST } from '../reducers/team';

const TeamCalendar = ({ setVisible, teamId, visible }) => {
  const { calendar, isGettedCalendar } = useSelector((state) => state.team);
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
  const dateCellRender = useCallback((value) => {
    const data = sortedDate[value.format('YYYY-MM-DD')];
    return (
      <Row>
        <Col span={24}>
          <Popconfirm
            title="참석하시겠습니까?"
            okText="참석"
            cancelText="취소"
          >
            <CheckSquareOutlined />
          </Popconfirm>
        </Col>
        <Col span={24}>
          {
            data && (
              data.filter((v) => v.possible === '0').length
            )
          }
        </Col>
        <Col span={24}>
          {
            data && (
              data.filter((v) => v.possible === '1').length
            )
          }
        </Col>
        <Col span={24}>
          {
            data && (
              data.filter((v) => v.possible === '2').length
            )
          }
        </Col>
      </Row>
    );
  }, [sortedDate]);
  const onSelectDate = useCallback((date) => {
    if (yearMonth !== date.format('YYYY-MM-01')) {
      setYearMonth(date.format('YYYY-MM-01'));
    }
  }, [yearMonth]);
  const disabledDate = useCallback((current) => current && current < moment().endOf('day'), []);

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
