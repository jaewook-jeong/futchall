import React, { useCallback } from 'react';
import { Button, Input, Modal, Form, Checkbox,} from 'antd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Link from 'next/link';
import { LOG_IN_REQUEST } from '../reducers/user';
import { SET_USER_ID } from '../reducers/messenger';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = (props) => {
    
    const { visible, setVisible } = props;
    const { isLoggingIn } = useSelector(state => state.user, shallowEqual);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    
    const onHandleCancel = (() => {
        form.resetFields(["id", "password"]);
        setVisible(false);
    })
    const onSubmitForm = useCallback(() => {
        dispatch({
            type: LOG_IN_REQUEST,
            data: form.getFieldsValue(["id","password"]),
        });
        dispatch({
            type: SET_USER_ID,
            data : form.getFieldValue("id")
        });
        
    }, []);

    return (
        <Modal
            title="FutChall로그인"
            visible={visible}
            onOk={onSubmitForm}
            onCancel={onHandleCancel}
            centered="true"
            footer={null}
            width="320px"
        >
            <Form
                layout="horizontal"
                form={form}
                onFinish={onSubmitForm}
                initialValues={{remember : true}}
            >
                <Form.Item
                name="id"
                >
                    <Input placeholder="아이디" prefix={<UserOutlined className="site-form-item-icon"/>} autoFocus={true}/>
                </Form.Item>

                <Form.Item
                name="password"
                >
                    <Input placeholder="비밀번호" type="password" prefix={<LockOutlined className="site-form-item-icon"/>} onPressEnter={onSubmitForm}/>
                </Form.Item>

                <Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName = "checked"
                        noStyle
                    >
                        <Checkbox>아이디 기억하기</Checkbox>
                    </Form.Item>
                    <Link href=""><a style={{float:"right"}}>비밀번호 찾기</a></Link>
                </Form.Item>

                <Form.Item shouldUpdate style={{marginBottom:0}}>
                    {()=>{
                        return (
                            <Button 
                                type="primary"
                                loading={isLoggingIn}
                                key="submit"
                                disabled={ !form.isFieldsTouched(["id", "password"],true) }
                                onClick={onSubmitForm}
                                style={{width:"100%"}}
                            >
                                로그인
                            </Button>
                    )}}
                </Form.Item>
                또는 <Link href="/signup"><a>회원가입하기</a></Link>
            </Form>
        </Modal>
    );
};

export default LoginForm;
