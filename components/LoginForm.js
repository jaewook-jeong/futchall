import React, { useCallback } from 'react';
import { Button, Input, Modal, Form,} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';
import { SET_USER_ID } from '../reducers/messenger';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = (props) => {
    
    const { visible, setVisible } = props;
    const { isLoggingIn } = useSelector(state => state.user);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    
    const onHandleCancel = (() => {
        // form.resetFields(["id", "password"]);
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
            footer={null}
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
                rules={[{required:true}]}
                >
                    <Input placeholder="아이디" prefix={<UserOutlined className="site-form-item-icon"/>} autoFocus={true}/>
                </Form.Item>
                <Form.Item
                name="password"
                label="비밀번호"
                rules={[{required:true}]}
                >
                    <Input placeholder="비밀번호" type="password" prefix={<LockOutlined className="site-form-item-icon"/>} onPressEnter={onSubmitForm}/>
                </Form.Item>

                <Form.Item shouldUpdate wrapperCol={{span:20}}>
                    {() => (
                    <div style={{textAlign:"right"}}>
                        <Button onClick={onHandleCancel} style={{marginRight:"10px"}}>
                            뒤로가기
                        </Button>
                        <Button 
                            type="primary"
                            loading={isLoggingIn}
                            key="submit"
                            disabled={ !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}
                            onClick={onSubmitForm}
                        >
                            로그인
                        </Button>
                    </div>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LoginForm;
