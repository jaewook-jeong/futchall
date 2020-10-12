import React, { useCallback, useEffect } from 'react';
import { Button, Calendar, Col, Drawer, Row, Select } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

const TeamCalendar = ({ setVisible, teamId, visible }) => {
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);
  const dateCellRender = useCallback((value) => {
    console.log(value);
    return null;
  }, []);
  const onSelectDate = useCallback((date) => {
    console.log(date);
  });
  // const onPanelChange = useCallback((date) => {
  //   console.log(date);
  // })
  const disabledDate = useCallback((current) => current && current < moment().endOf('day'), []);
  const makeData = useCallback(({ value, type, onChange }) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];
    const current = value.clone();
    const localeData = value.localeData();
    console.log(localeData, current);
    const months = [];
    for (let i = 0; i < 12; i++) {
      current.month(i);
      months.push(localeData.monthsShort(current));
    }

    for (let index = start; index < end; index++) {
      monthOptions.push(
        <Select.Option className="month-item" key={`${index}`}>
          {months[index]}
        </Select.Option>,
      );
    }
    const month = value.month();

    const year = value.year();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
      options.push(
        <Select.Option key={i} value={i} className="year-item">
          {i}
        </Select.Option>,
      );
    }
    return (
      <div style={{ padding: 8 }}>
        <Row gutter={8}>
          <Col>
            <Select
              size="small"
              dropdownMatchSelectWidth={false}
              className="my-year-select"
              onChange={(newYear) => {
                const now = value.clone().year(newYear);
                onChange(now);
              }}
              value={String(year)}
            >
              {options}
            </Select>
          </Col>
          <Col>
            <Select
              size="small"
              dropdownMatchSelectWidth={false}
              value={String(month)}
              onChange={(selectedMonth) => {
                const newValue = value.clone();
                newValue.month(parseInt(selectedMonth, 10));
                onChange(newValue);
              }}
            >
              {monthOptions}
            </Select>
          </Col>
        </Row>
      </div>
    );
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
        // onPanelChange={onPanelChange}
      />
      {/* <Calendar
        locale={{ lang: { locale: 'ko', month: '월', year: '년' }, dateFormat: 'YYYY-MM-DD' }}
        headerRender={makeData}
        disabledDate={disabledDate}
        onSelect={onSelectDate}
        // onPanelChange={onPanelChange}
      /> */}
    </Drawer>
  );
};

TeamCalendar.propTypes = {
  setVisible: PropTypes.func.isRequired,
  teamId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default TeamCalendar;
