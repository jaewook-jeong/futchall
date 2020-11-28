import React, { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import { AutoComplete, Button, DatePicker, Form, message, Modal } from 'antd';
import { backUrl } from '../config/config';
import { useSelector } from 'react-redux';

const ReserveMatch = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [stadiumOptions, setStadiumOptions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [teamId, setTeamId] = useState(0);
  const [stadiumId, setStadiumId] = useState(0);
  const newStadiumRequest = useRef();
  const newTeamRequest = useRef();
  const token = useSelector((state) => state.user.token);

  const onStadiumSearch = useCallback((searchText) => {
    clearTimeout(newStadiumRequest.current);
    newStadiumRequest.current = setTimeout(() => {
      axios.get(`${backUrl}/stadium/search?q=${searchText}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((result) => result.data.map((v) => ({ label: v.title, value: v.title, id: v.id }))).then((data) => {
          setStadiumOptions(
            !searchText ? [] : data,
          );
        })
        .catch((err) => console.error(err));
    }, 400);
  }, []);

  const disabledDate = useCallback((current) => current && current < moment().endOf('day'), []);

  const onTeamSearch = useCallback((searchText) => {
    clearTimeout(newTeamRequest.current);
    newTeamRequest.current = setTimeout(() => {
      axios.get(`${backUrl}/team/search?q=${searchText}`, { headers: { Authorization: `Bearer ${token}` } })
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
    setTeamId(allData.id);
  }, []);
  const onStadiumSelect = useCallback((data, allData) => {
    setStadiumId(allData.id);
  }, []);
  const onFinishMatch = useCallback(() => {
    const data = {
      date: form.getFieldValue('date').format('YYYY-MM-DD HH:mm:00'),
      HomeId: teamId,
      StadiumId: stadiumId,
    };
    axios.post(`${backUrl}/match/reservation`, data, { withCredentials: true })
      .then((result) => {
        message.success(result.data);
        setVisible(false);
      })
      .catch((error) => {
        console.error(error);
        message.error(error);
      });
  }, [stadiumId, teamId]);
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
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        layout="horizontal"
        size="large"
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
