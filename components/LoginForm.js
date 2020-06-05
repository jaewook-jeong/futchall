import React, { useCallback, useEffect,} from 'react';
import { Button, Input, Modal, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = (props) => {
    
    const { visible, setVisible } = props;
    const { isLoggingIn, isLoggedIn } = useSelector(state => state.user);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(
        ()=>{
            if(isLoggedIn){
                setVisible(false);
                form.resetFields(["id", "password"]);
            }
        },[isLoggedIn]
    )
    const onHandleCancel = (() => {
        setVisible(false);
    })
    const onSubmitForm = useCallback(() => {
        dispatch({
            type: LOG_IN_REQUEST,
            data: form.getFieldsValue(["id","password"]),
        });
    }, []);

    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 14,
        },
    };
    return (
        <Modal
            title="FutChall로그인"
            visible={visible}
            onOk={onSubmitForm}
            onCancel={onHandleCancel}
            centered="true"
            footer={[
                <Button key="back" onClick={onHandleCancel}>
                    뒤로가기
                </Button>,
                <Button key="submit" type="primary" loading={isLoggingIn} onClick={onSubmitForm}>
                    로그인
                </Button>,
            ]}
        >
            <Form
            {...formItemLayout}
            layout="horizontal"
            form={form}
            onFinish={onSubmitForm}
            >
                <Form.Item
                name="id"
                label="아이디"
                >
                    <Input placeholder="아이디" prefix={<UserOutlined className="site-form-item-icon"/>} autoFocus={true}/>
                </Form.Item>
                <Form.Item
                name="password"
                label="비밀번호"
                >
                    <Input placeholder="비밀번호" type="password" prefix={<LockOutlined className="site-form-item-icon"/>} onPressEnter={onSubmitForm}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LoginForm;
