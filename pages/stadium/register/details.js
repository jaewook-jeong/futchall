import React, { useEffect, useState, useCallback } from 'react';
import { withRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import {ENROLL_STADIUM_REQUEST} from '../../../reducers/stadium'
import { Col, Row, Typography, Button, Form, Input, TimePicker, Radio, Select, Upload} from 'antd';
import { PlusOutlined} from '@ant-design/icons';

const Details = (props) => {
    // const [, forceUpdate] = useState(); 
    const { isEnrolling } = useSelector(state => state.stadium);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    let data;

    if (props.router.query.data) {
        data = props.router.query.data.split(",");
    }else{
        console.log("어디서 사기치려고하니?");
    }
    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 14,
        },
    };
    const onSubmitForm = useCallback((values)=>{
        console.log(values);
        dispatch({
            type:ENROLL_STADIUM_REQUEST,
            data:{
                ...values
            }
        })
    })
    const multipleSpecaility = [
        <Select.Option key={"1"}>잔디구장</Select.Option>,
        <Select.Option key={"2"}>우레탄구장</Select.Option>,
        <Select.Option key={"3"}>플라스틱 인도어구장</Select.Option>,
        <Select.Option key={"4"}>샤워실</Select.Option>,
        <Select.Option key={"5"}>근처 편의점</Select.Option>,
        <Select.Option key={"6"}>탈의실</Select.Option>,
        <Select.Option key={"7"}>대기용 좌석</Select.Option>,
    ];
    const normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const uploadButton = (
    <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
    </div>
    );
    // useEffect(() => {
    //     forceUpdate({});
    // }, []);
    return (
        <div style={{ width: '430px', margin: "0 auto", border: "1px solid #dadce0", borderRadius: "8px", padding:"30px 10px" }}>
            <Row gutter={[0, 16]}>
                <Col style={{ width: '100%', textAlign: "center" }}>
                    <Typography.Title level={3} style={{ color: "#202124" }}>구장 등록하기</Typography.Title>
                    <Typography style={{ color: "#202124", fontWeight: "normal" }}>구장 상세정보</Typography>
                </Col>
            </Row>
            <Row gutter={[0, 16]}>
                <Col span={22} offset={1}>
                    <Form 
                    {...formItemLayout}
                    layout="horizontal"
                    form={form}
                    initialValues={{location:data? data[2]:'', light:'N'}}
                    onFinish={onSubmitForm}
                    scrollToFirstError
                    >
                        <Form.Item
                        name="title"
                        label="구장명"
                        rules={[{required:true, message:"구장명을 입력하여주세요"}]}
                        >
                            <Input placeholder="정식 구장명을 입력해주세요"/>
                        </Form.Item>
                        <Form.Item
                        name="location"
                        label="주소"
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                        name="time"
                        label="사용시간"
                        rules={[{required:true, message:"사용가능 시간을 확인해주세요"}]}
                        >
                            <TimePicker.RangePicker mode="time" use12Hours format="h:mm a" />
                        </Form.Item>
                        <Form.Item
                        name="light"
                        label="라이트 여부"
                        >
                            <Radio.Group>
                                <Radio value="Y">있음</Radio>
                                <Radio value="N">없음</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                        name="size"
                        label="구장 사이즈"
                        rules={[{required:true, message:"구장 크기를 체크해주세요"}]}
                        >
                            <Radio.Group>
                                <Radio value="F">풋살</Radio>
                                <Radio value="M">중형 축구장</Radio>
                                <Radio value="N">국제규격 축구장</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                        name="special"
                        label="특징"
                        >
                            <Select mode="tags" placeholder="구장의 다양한 특징을 선택해주세요">
                                {multipleSpecaility}
                            </Select>
                        </Form.Item>
                        <Form.Item
                        name="description"
                        label="설명"
                        >
                            <Input.TextArea placeholder="구장 설명과 특징을 적어주세요" autoSize/>
                        </Form.Item>
                        <Form.Item
                        name="picture"
                        label="사진"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        >
                            <Upload name="upload" listType="picture-card">
                                {uploadButton}
                            </Upload>

                        </Form.Item>
                        
                        <Form.Item
                        shouldUpdate
                        wrapperCol={{
                        span: 18,
                        offset: 6
                        }}
                        style={{marginBottom:0}}
                        >
                            {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                shape="round"
                                loading={isEnrolling}
                                disabled={
                                    !form.isFieldsTouched(["title", "size", "time"],true) ||
                                    form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
                            >
                                등록하기
                            </Button>
                            )}
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default withRouter(Details);