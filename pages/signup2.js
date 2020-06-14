import React, { useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { Row, Col, Typography, Form, Input, Space, Tooltip, Divider, Select, Button } from 'antd';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { UserOutlined, QuestionCircleOutlined, TrophyFilled, TrophyTwoTone } from '@ant-design/icons';

const Signup = () => {
    const dispatch = useDispatch();
    const [titleSize, onAlterTitleSize] = useState(2);
    const [form] = Form.useForm();
    const { isSigningUp, me, isSignedUp, } = useSelector(state => state.user);

    const submitSignupData = useCallback(()=>{
        console.log(form.getFieldsValue());
        dispatch({
            type:SIGN_UP_REQUEST,
            data: {
                ...form.getFieldsValue()
            }
        })
    },[])

    const positions = [
        <Select.Option key={"PIVO"}><Tooltip title={"중앙 공격수"}>PIVO</Tooltip></Select.Option>,
        <Select.Option key={"ALA"} ><Tooltip title={"윙어"}>ALA</Tooltip></Select.Option>,
        <Select.Option key={"FIXO"} ><Tooltip title={"수비수"}>FIXO</Tooltip></Select.Option>,
        <Select.Option key={"GOLEIRO"} ><Tooltip title={"골키퍼"}>GOLEIRO</Tooltip></Select.Option>
    ];
    const ageGroup = [
        <Select.Option key={"10"} value={"10대"}>10대</Select.Option>,
        <Select.Option key={"20"} value={"20대"}>20대</Select.Option>,
        <Select.Option key={"30"} value={"30대"}>30대</Select.Option>,
        <Select.Option key={"40"} value={"40대"}>40대</Select.Option>,
        <Select.Option key={"50"} value={"50대"}>50대</Select.Option>
    ]
    const locations = [
        <Select.Option key={"서울"} value={"서울"}>서울</Select.Option>,
        <Select.Option key={"부산"} value={"부산"}>부산</Select.Option>,
        <Select.Option key={"인천"} value={"인천"}>인천</Select.Option>,
        <Select.Option key={"대구"} value={"대구"}>대구</Select.Option>,
        <Select.Option key={"광주"} value={"광주"}>광주</Select.Option>,
        <Select.Option key={"대전"} value={"대전"}>대전</Select.Option>,
        <Select.Option key={"울산"} value={"울산"}>울산</Select.Option>,
        <Select.Option key={"세종"} value={"세종"}>세종</Select.Option>,
        <Select.Option key={"경기"} value={"경기"}>경기</Select.Option>,
        <Select.Option key={"강원"} value={"강원"}>강원</Select.Option>,
        <Select.Option key={"충북"} value={"충북"}>충북</Select.Option>,
        <Select.Option key={"충남"} value={"충남"}>충남</Select.Option>,
        <Select.Option key={"전북"} value={"전북"}>전북</Select.Option>,
        <Select.Option key={"전남"} value={"전남"}>전남</Select.Option>,
        <Select.Option key={"경북"} value={"경북"}>경북</Select.Option>,
        <Select.Option key={"경남"} value={"경남"}>경남</Select.Option>,
        <Select.Option key={"제주"} value={"제주"}>제주</Select.Option>
    ]
    useEffect(() => {
        if (isSignedUp) {
            message.success("회원가입이 정상적으로 처리되었습니다.")
            Router.push('/stadia');
        }
    }, [isSignedUp]);
    useEffect(()=>{
        if(me){
            message.error("로그인 상태입니다");
            Router.push("/stadia")
        }
    },[me])
    return(
        <Row>
            <Col xs={{sapn:22, offset:1}} sm={{span:16, offset:4}} md={{span:12, offset:6}} xl={{span:8, offset:8}} xxl={{span:6, offset:9}} style={{margin: "0 auto", padding:"30px 10px 20px 10px", textAlign:"center", }}>
                <Row justify="center">
                    <Col span={24} >
                        <Typography.Title level={titleSize}  ellipsis={{rows:1, expandable:false, onEllipsis:(el)=>{ if(el){onAlterTitleSize(titleSize !=4? titleSize+1 : titleSize)}else{console.log("what")}}, onExpand:(ev)=>{console.log(ev)} }}><TrophyTwoTone twoToneColor="#e6c71e" style={{fontSize:"25px", marginBottom:"10px"}}/> 지역 챔피언이 되어보세요!</Typography.Title>
                        
                    </Col>
                </Row>
                <Row>
                    <Form
                        layout="horizontal"
                        style={{width:"100%"}}
                        form={form}
                        colon={false}
                        onFinish={submitSignupData}
                        labelAlign="left"
                        labelCol={{flex:"0.3 0 100px"}}
                        wrapperCol={{flex:"1 1 200px"}}
                    >
                        <Form.Item
                            name="id"
                            label="아이디"
                            hasFeedback
                            rules={[{required:true, min:5, max:20, pattern : /^[a-z]+[a-z0-9]{4,19}$/, message : "5자 이상 20자 이하의 영소문자로 시작하는 아이디를 입력해주세요" },
                                () => ({
                                    async validator(rule, value){
                                        // const isTaken = await axios.get('')
                                        const nameTaken = "everest88";
                                        if(value !== nameTaken){
                                            return Promise.resolve("사용 가능한 아이디입니다.");
                                        }
                                        return Promise.reject("이미 사용중인 아이디입니다.");
                                    }
                                })
                            ]}
                        >
                            <Input placeholder="아이디" prefix={<UserOutlined/>} autoFocus={true}/>
                        </Form.Item>
                        <Form.Item
                            name="nickname"
                            rules={[{required:true, message:"닉네임을 입력해주세요"}]}
                            label={<Space>닉네임<Tooltip title="설정하신 닉네임으로 활동하게 됩니다!"><QuestionCircleOutlined/></Tooltip></Space>}
                        >
                            <Input placeholder="닉네임"/>
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
                        
                        <Divider orientation="left" style={{color:"#bbb"}}>선택항목</Divider>

                        <Form.Item
                            name="selectedPositions"
                            label="풋살 포지션"
                        >
                            <Select
                                size="middle"
                                mode="multiple"
                                placeholder="풋살 포지션을 선택해주세요"
                            >
                                {positions}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="age"
                            label="연령대"
                        >
                            <Select
                                size="middle"
                                placeholder="연령대를 체크해 주세요"
                            >
                                {ageGroup}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="selectedLocations"
                            label="활동지역"
                        >
                            <Select
                                size="middle"
                                mode="multiple"
                            >
                                {locations}
                            </Select>
                        </Form.Item>

                        <Form.Item shouldUpdate wrapperCol={{span:24}}>
                            {()=>{
                                return(
                                    <Button
                                        type="primary"
                                        style={{width:"100%"}} 
                                        htmlType="submit"
                                        loading={isSigningUp}
                                        disabled={!form.isFieldsTouched(["id", "nickname", "password", "confirm"],true) ||form.getFieldsError().filter(({ errors }) => errors.length).length}
                                    >
                                        회원가입
                                    </Button>
                                )
                            }}
                        </Form.Item>
                    </Form>
                </Row>
            </Col>
        </Row>
    );
}

export default Signup;
