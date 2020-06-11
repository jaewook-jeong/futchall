import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'
import { Form, Input, Button, Row, Col, Typography, message, Select, Tooltip, Divider, Popover } from 'antd';
import { useInput } from '../util/useInput';
import { useSetter } from '../util/useSetter';
import { SIGN_UP_REQUEST, PREEMPT_REQUEST } from '../reducers/user';
import { TrophyOutlined, UserOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const positions = [
    <Select.Option key={"PIVO"}><Tooltip title={"중앙 공격수"}>PIVO</Tooltip></Select.Option>,
    <Select.Option key={"ALA"} ><Tooltip title={"윙어"}>ALA</Tooltip></Select.Option>,
    <Select.Option key={"FIXO"} ><Tooltip title={"수비수"}>FIXO</Tooltip></Select.Option>,
    <Select.Option key={"GOLEIRO"} ><Tooltip title={"골키퍼"}>GOLEIRO</Tooltip></Select.Option>
];

const ageGroup = [
    <Select.Option key={"10대"} value={"10대"}>10대</Select.Option>,
    <Select.Option key={"20대"} value={"20대"}>20대</Select.Option>,
    <Select.Option key={"30대"} value={"30대"}>30대</Select.Option>,
    <Select.Option key={"40대"} value={"40대"}>40대</Select.Option>,
    <Select.Option key={"50대"} value={"50대"}>50대</Select.Option>
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

const Signup = () => {
    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, onPasswordCheck] = useInput('');

    const [selectedPositions, onPositions] = useSetter('');
    const [age, onAge] = useSetter('');
    const [selectedLocations, onLocations] = useSetter('');
    
    const { isSigningUp, me, isSignedUp, preemptErrorReason, isPreempting } = useSelector(state => state.user);
    const dispatch = useDispatch();

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
    const checkIdOverlap = () =>{
        //중복체크 및 만약의 상황에서 중복 입력 제어, 체크시 사용가능한 아이디면 미리 데이터에 입력하여 대기 상태 유지
        dispatch({
            type:PREEMPT_REQUEST,
            data : id,
        })
    }
    useEffect(()=>{
        if(!isPreempting){
            if(preemptErrorReason){
                message.error("해당 아이디는 이미 사용중입니다.")
            }
        }
    },[isPreempting])
    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        console.log(`id=${id}, nick=${nick}, password=${password}, passwordchekc=${passwordCheck}, positions=${selectedPositions}, age=${age}, where=${selectedLocations}`);
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        return dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                id: id,
                password:password,
                nick:nick,
                selectedPositions:selectedPositions,
                age:age,
                selectedLocations:selectedLocations,
            },
        });
    }, [password, passwordCheck]);

    const onBlurPasswordCheck = useCallback((e) => {
        message.destroy();
        { (e.target.value !== password) ? message.error('비밀번호가 일치하지 않습니다.') : message.success('비밀번호가 일치합니다.') }
    }, [password]);

    return (
        <Row>
            <Col xs={{span:22, offset:1}} md={{span:14, offset:5}} xl={{span:10,offset:4}} xxl={{span:8, offset:8}} style={{ margin: "0 auto", border: "1px solid #dadce0", borderRadius: "8px", padding:"30px 10px" }}>
                <Row>
                    <Col style={{ width: '100%', textAlign: 'center' }}>
                        <Typography.Title level={2}>지역 챔피언이 되어보세요</Typography.Title><TrophyOutlined />
                    </Col>
                </Row>
                <Row style={{ textAlign: "center" }}>
                    <Form onSubmit={onSubmitForm} style={{ padding: 10, width:'100%', textAlign:'left' }}>
                        <Divider orientation="left" style={{ color: '#ff8ca0' }}>필수항목</Divider>
                        <Row gutter={[0, 16]}>
                            <Col xs={{span:24}} sm={{span:8, offset:1}} md={{span:6, offset:2}} xl={{span:4, offset:2}} style={{ lineHeight: "32px" }}>
                                아이디
                            </Col>
                            <Col xs={{span:24}} sm={{span:13, offset:1}} md={{span:13, offset:1}} xl={{span:15, offset:1}}>
                                <Popover trigger="focus" content="첫문자가 영소문자로 시작하는 5자 이상 아이디를 입력해 주세요" placement="topLeft">
                                    <Input name="user-id" value={id} required onChange={onChangeId} prefix={<UserOutlined />}  onBlur={checkIdOverlap}/>
                                </Popover>
                            </Col>
                        </Row>
                        <Row gutter={[0, 16]}>
                            <Col xs={{span:24}} sm={{span:8, offset:1}} md={{span:6, offset:2}} xl={{span:4, offset:2}} style={{ lineHeight: "32px" }}>
                                닉네임 <Tooltip title="설정하신 닉네임으로 활동하게 됩니다"><QuestionCircleOutlined/></Tooltip>
                            </Col>
                            <Col xs={{span:24}} sm={{span:13, offset:1}} md={{span:13, offset:1}} xl={{span:15, offset:1}}>
                                <Input name="user-nick" value={nick} required onChange={onChangeNick} />
                            </Col>
                        </Row>
                        <Row gutter={[0, 16]}>
                            <Col xs={{span:24}} sm={{span:8, offset:1}} md={{span:6, offset:2}} xl={{span:4, offset:2}} style={{ lineHeight: "32px" }}>
                                비밀번호
                            </Col>
                            <Col xs={{span:24}} sm={{span:13, offset:1}} md={{span:13, offset:1}} xl={{span:15, offset:1}}>
                                <Input.Password name="user-password" value={password} required onChange={onChangePassword} />
                            </Col>
                        </Row>
                        <Row gutter={[0, 16]}>
                            <Col xs={{span:24}} sm={{span:8, offset:1}} md={{span:6, offset:2}} xl={{span:4, offset:2}} style={{ lineHeight: "32px" }}>
                                비밀번호 확인
                            </Col>
                            <Col xs={{span:24}} sm={{span:13, offset:1}} md={{span:13, offset:1}} xl={{span:15, offset:1}}>
                                <Input.Password name="user-password-check" value={passwordCheck} required onBlur={onBlurPasswordCheck} onChange={onPasswordCheck} />
                            </Col>
                        </Row>
                        <Divider orientation="left" style={{color :"#bbb"}}>선택항목</Divider>
                        <Row gutter={[0, 16]}>
                            <Col xs={{span:24}} sm={{span:8, offset:1}} md={{span:6, offset:2}} xl={{span:4, offset:2}} style={{ lineHeight: "32px" }}>
                                주 포지션
                            </Col>
                            <Col xs={{span:24}} sm={{span:13, offset:1}} md={{span:13, offset:1}} xl={{span:15, offset:1}}>
                                <Select
                                    size="middle"
                                    mode="multiple"
                                    placeholder="풋살 포지션을 선택해주세요"
                                    onChange={onPositions}
                                    style={{ width: '100%' }}
                                >
                                    {positions}
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={[0, 16]}>
                            <Col xs={{span:24}} sm={{span:8, offset:1}} md={{span:6, offset:2}} xl={{span:4, offset:2}} style={{ lineHeight: "32px" }}>
                                연령대
                            </Col>
                            <Col xs={{span:24}} sm={{span:13, offset:1}} md={{span:13, offset:1}} xl={{span:15, offset:1}}>
                                <Select
                                    size="middle"
                                    placeholder="연령대를 체크해 주세요"
                                    onChange={onAge}
                                    style={{ width: '100%' }}
                                >
                                    {ageGroup}
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={[0, 16]}>
                            <Col xs={{span:24}} sm={{span:8, offset:1}} md={{span:6, offset:2}} xl={{span:4, offset:2}} style={{ lineHeight: "32px" }}>
                                활동지역
                            </Col>
                            <Col xs={{span:24}} sm={{span:13, offset:1}} md={{span:13, offset:1}} xl={{span:15, offset:1}}>
                                <Select
                                    size="middle"
                                    mode="multiple"
                                    onChange={onLocations}
                                    style={{ width: '100%' }}
                                >
                                    {locations}
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{ textAlign: 'center', marginTop: '10px' }}>
                            <Col style={{ width: '100%' }}>
                                <Button type="primary" 
                                        shape="round" 
                                        size="large" 
                                        htmlType="button" 
                                        onClick={onSubmitForm} 
                                        disabled={!/^[a-z]+[a-z0-9]{5,19}$/.test(id)}
                                        loading={isSigningUp}
                                >
                                    가입하기
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Col>
        </Row>
    );
};

export default Signup;
