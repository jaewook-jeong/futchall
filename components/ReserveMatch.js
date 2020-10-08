import React, { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import { AutoComplete, Button, DatePicker, Form, message, Modal } from 'antd';

const ReserveMatch = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [stadiumOptions, setStadiumOptions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [matchInfo, setMatchInfo] = useState({ teamId: null, title: null, stadiumId: null });
  const newStadiumRequest = useRef();
  const newTeamRequest = useRef();

  const onStadiumSearch = useCallback((searchText) => {
    clearTimeout(newStadiumRequest.current);
    newStadiumRequest.current = setTimeout(() => {
      axios.get(`http://localhost:3065/stadium/search?q=${searchText}`, { withCredentials: true })
        .then((result) => result.data.map((v) => ({ label: v.title, value: v.title, id: v.id }))).then((data) => {
          setStadiumOptions(
            !searchText ? [] : data,
          );
        })
        .catch((err) => console.error(err));
    }, 300);
  }, []);

  const disabledDate = useCallback((current) => current && current < moment().endOf('day'), [matchInfo.valid]);

  const onTeamSearch = useCallback((searchText) => {
    clearTimeout(newTeamRequest.current);
    newTeamRequest.current = setTimeout(() => {
      axios.get(`http://localhost:3065/team/search?q=${searchText}`, { withCredentials: true })
        .then((result) => result.data.map((v) => ({ label: v.title, value: v.title, id: v.id }))).then((data) => {
          setTeamOptions(
            !searchText ? [] : data,
          );
        })
        .catch((err) => console.error(err));
    }, 300);
  }, []);
  const onHandleCancel = useCallback(() => {
    setVisible(false);
  });
  const onTeamSelect = useCallback((data, allData) => {
    console.log('------------------------------------');
    console.log(data, allData);
    console.log('------------------------------------');
    setMatchInfo({
      ...matchInfo,
      teamId: allData.id,
    });
  }, []);
  const onStadiumSelect = useCallback((data, allData) => {
    console.log('------------------------------------');
    console.log(data, allData);
    console.log('------------------------------------');
    setMatchInfo({
      ...matchInfo,
      stadiumId: allData.id,
    });
  }, []);
  const onFinishMatch = useCallback(() => {
    const data = {
      date: form.getFieldValue('date').format('YYYY-MM-DD HH:mm:00'),
      HomeId: matchInfo.teamId,
      StadiumId: matchInfo.stadiumId,
    };
    axios.post('http://localhost:3065/match/reserve', data, { withCredentials: true })
      .then((result) => {
        message.success(result.data);
        setVisible(false);
      })
      .catch((error) => {
        console.error(error);
        message.error(error);
      });
  }, [matchInfo]);
  return (
    <Modal
      title="경기 신청하기"
      visible={visible}
      onCancel={onHandleCancel}
      centered
      width="430px"
      footer={null}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        onFinish={onFinishMatch}
      >
        <Form.Item
          name="homeTitle"
          label="상대팀"
          colon={false}
        >
          <AutoComplete
            allowClear
            onSearch={onTeamSearch}
            onSelect={onTeamSelect}
            options={teamOptions}
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="stadium"
          label="구장"
          colon={false}
        >
          <AutoComplete
            allowClear
            onSearch={onStadiumSearch}
            onSelect={onStadiumSelect}
            options={stadiumOptions}
          />
        </Form.Item>
        <Form.Item name="date" label="일시" colon={false}>
          <DatePicker
            style={{ width: '300px' }}
            size="large"
            format="YYYY-MM-DD HH:mm"
            disabledDate={disabledDate}
            showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            경기 신청
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

ReserveMatch.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default ReserveMatch;
