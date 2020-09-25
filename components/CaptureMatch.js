import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal, Form, DatePicker, Button, AutoComplete, message, notification } from 'antd';
import moment from 'moment';
import axios from 'axios';
import PropTypes from 'prop-types';
import Link from 'next/link';

const CaptureMatch = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [matchInfo, setMatchInfo] = useState({ teamId: null, title: null, stadiumId: null, valid: null });
  const newRequest = useRef();

  const onSearch = useCallback((searchText) => {
    clearTimeout(newRequest.current);
    newRequest.current = setTimeout(() => {
      axios.get(`http://localhost:3065/stadium/istaken?q=${searchText}`, { withCredentials: true })
        .then((result) => result.data.map((v) => ({ label: v.title, value: v.title, id: v.id, teamtitle: v.Team.title, teamid: v.Team.id, valid: v.valid }))).then((data) => {
          setOptions(
            !searchText ? [] : data,
          );
        })
        .catch((err) => console.error(err));
    }, 300);
  }, []);
  const onSelect = useCallback((data, allData) => {
    console.log('onSelect', allData);
    setMatchInfo({
      teamId: allData.teamid,
      title: allData.teamtitle,
      stadiumId: allData.id,
      valid: allData.valid,
    });
  }, []);
  const onHandleCancel = useCallback(() => {
    setVisible(false);
  });
  const onFinishCapture = useCallback(() => {
    const data = {
      date: form.getFieldValue('date').format('YYYY-MM-DD HH:mm:00'),
      HomeId: matchInfo.teamId,
      StadiumId: matchInfo.stadiumId,
    };
    axios.post('http://localhost:3065/match/capture', data, { withCredentials: true })
      .then((result) => {
        message.success(result.data);
        setVisible(false);
      })
      .catch((error) => {
        console.error(error);
        message.error(error);
      });
  }, [matchInfo]);
  const disabledDate = useCallback((current) => current <= moment().endOf('day') || current >= moment(matchInfo.valid), [matchInfo.valid]);
  useEffect(() => {
    notification.destroy();
    notification.info({
      message: '해당 구장을 검색해주세요',
      description: '점령된 구장이 아니거나 본인 팀이 점령했을 경우, 경기예정인 점령전이 있을 경우 검색되지 않습니다!',
      duration: 0,
    });
  }, []);
  return (
    <Modal
      title="점령전 신청하기"
      visible={visible}
      onCancel={onHandleCancel}
      centered
      width="330px"
      footer={null}
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18, offset: 1 }}
        layout="horizontal"
        form={form}
        onFinish={onFinishCapture}
      >
        <Form.Item
          name="stadiumTitle"
          label="구장"
          colon={false}
        >
          <AutoComplete
            allowClear
            onSearch={onSearch}
            onSelect={onSelect}
            options={options}
            autoFocus
          />
        </Form.Item>
        {
          matchInfo.teamId
          && (
            <Form.Item
              label="점령팀"
              colon={false}
            >
              <Link href={`/team/${matchInfo.teamId}`}><a>{matchInfo.title}</a></Link>
            </Form.Item>
          )
        }
        <Form.Item name="date" label="일시" colon={false}>
          <DatePicker
            format="YYYY-MM-DD HH:mm"
            disabledDate={disabledDate}
            showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 24 }}
          style={{ textAlign: 'center' }}
        >
          <Button
            type="primary"
            htmlType="submit"
          >
            일정 생성
          </Button>
        </Form.Item>
      </Form>

    </Modal>
  );
};

CaptureMatch.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default CaptureMatch;
