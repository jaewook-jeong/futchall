import React, {useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { Row, Col, Typography, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {CHANGE_TO_REQUEST} from '../../reducers/user'
import AppLayout from '../../components/AppLayout';

const Altpwd = () => {
    const { me, isChangingTo } = useSelector(state => state.user);
    const [form] = Form.useForm();
    const dipatch = useDispatch();
    
    const submitAlterUserData = useCallback(() =>{
        dipatch({
            type:CHANGE_TO_REQUEST,
            data:{...form.getFieldsValue()}
        })
    },[])
    useEffect(()=>{
        if(!me){
            message.error("로그인 후 접근 가능한 페이지입니다.",10);
            Router.push("/stadia");
        }
    },[])
    return (
        <AppLayout>
            <Row>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 16, offset: 4 }} md={{ span: 12, offset: 6 }} xl={{span:8, offset:8}} xxl={{span:6, offset:9}} style={{margin: "0 auto", padding:"30px 10px 20px 10px", textAlign:"center", }}>
                    <Row justify="center">
                        <Typography.Title level={3}><LockOutlined style={{fontSize:'20px'}}/> 비밀번호 변경</Typography.Title>
                    </Row>
                    <Row>
                        <Form
                            layout="horizontal"
                            style={{width:"100%"}}
                            form={form}
                            colon={false}
                            onFinish={submitAlterUserData}
                            labelAlign="left"
                            labelCol={{flex:"0.3 0 130px"}}
                            wrapperCol={{flex:"1 1 170px"}}
                        >
                            <Form.Item
                                name="id"
                                label="아이디"
                            >
                                <Input prefix={<UserOutlined/>} disabled defaultValue={me?.id}/>
                            </Form.Item>
                            
                            <Form.Item
                                name="prevpwd"
                                dependencies={['alterpwd']}
                                rules={[{required:true, message:"6자 이상의 비밀번호를 확인해주세요!", min:6}]}
                                label={"비밀번호 확인"}
                            >
                                <Input.Password placeholder={"비밀번호 확인"} />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="비밀번호"
                                rules={[
                                {
                                    required: true,
                                    message: '6자 이상 비밀번호를 입력해주세요!',
                                    min:6
                                },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="비밀번호 확인"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '비밀번호를 재확인해주세요!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                        return Promise.reject('비밀번호가 일치하지 않습니다.');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item shouldUpdate wrapperCol={{span:24}}>
                                {()=>{
                                    return(
                                        <Button
                                            type="primary"
                                            style={{width:"100%", borderRadius:"15px"}} 
                                            htmlType="submit"
                                            loading={isChangingTo}
                                            disabled={!form.isFieldsTouched(["prevpwd", "password", "confirm"],true) ||form.getFieldsError().filter(({ errors }) => errors.length).length}
                                        >
                                            비밀번호 변경
                                        </Button>
                                    )
                                }}
                            </Form.Item>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </AppLayout>
    );
}
export default Altpwd;