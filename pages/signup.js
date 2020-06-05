import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Row, Col, Typography, message, Select, Tooltip, Divider } from 'antd';
import { useInput } from '../util/useInput';
import { useSetter } from '../util/useSetter';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { TrophyOutlined, UserOutlined } from '@ant-design/icons';

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
    
    const { isSigningUp, me } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (me) {
            message.success("회원가입이 정상적으로 처리되었습니다.")
            Router.push('/stadia');
        }
    }, [me && me.id]);

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
        <div style={{ width: '450px', margin: '0 auto' }}>
            <Row>
                <Col style={{ width: '100%', textAlign: 'center' }}>
                    <Typography.Title level={2}>지역 챔피언이 되어보세요</Typography.Title><TrophyOutlined />
                </Col>
            </Row>
            <Row style={{ textAlign: "center" }}>
                <Form onSubmit={onSubmitForm} style={{ padding: 10 }}>
                    <Divider orientation="left" style={{ color: '#ff8ca0' }}>필수항목</Divider>
                    <Row gutter={[0, 16]}>
                        <Col style={{ width: 100, display: "inline-block", textAlign: "left", lineHeight: "32px" }}>
                            아이디
                        </Col>
                        <Col style={{ width: 300, display: "inline-block", textAlign: "left" }}>
                            <Input name="user-id" value={id} required onChange={onChangeId} prefix={<UserOutlined />} />
                        </Col>
                    </Row>
                    <Row gutter={[0, 16]}>
                        <Col style={{ width: 100, display: "inline-block", textAlign: "left", lineHeight: "32px" }}>
                            닉네임
                        </Col>
                        <Col style={{ width: 300, display: "inline-block", textAlign: "left" }}>
                            <Input name="user-nick" value={nick} required onChange={onChangeNick} />
                        </Col>
                    </Row>
                    <Row gutter={[0, 16]}>
                        <Col style={{ width: 100, display: "inline-block", textAlign: "left", lineHeight: "32px" }}>
                            비밀번호
                        </Col>
                        <Col style={{ width: 300, display: "inline-block", textAlign: "left" }}>
                            <Input.Password name="user-password" value={password} required onChange={onChangePassword} />
                        </Col>
                    </Row>
                    <Row gutter={[0, 16]}>
                        <Col style={{ width: 100, display: "inline-block", textAlign: "left", lineHeight: "32px" }}>
                            비밀번호 확인
                        </Col>
                        <Col style={{ width: 300, display: "inline-block", textAlign: "left" }}>
                            <Input.Password name="user-password-check" value={passwordCheck} required onBlur={onBlurPasswordCheck} onChange={onPasswordCheck} />
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Row gutter={[0, 16]}>
                        <Col style={{ width: 100, display: "inline-block", textAlign: "left", lineHeight: "32px" }}>
                            주 포지션
                        </Col>
                        <Col style={{ width: 300, display: "inline-block", textAlign: "left" }}>
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
                        <Col style={{ width: 100, display: "inline-block", textAlign: "left", lineHeight: "32px" }}>
                            연령대
                        </Col>
                        <Col style={{ width: 300, display: "inline-block", textAlign: "left" }}>
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
                        <Col style={{ width: 100, display: "inline-block", textAlign: "left", lineHeight: "32px" }}>
                            활동지역
                        </Col>
                        <Col style={{ width: 300, display: "inline-block", textAlign: "left" }}>
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
                            <Button type="primary" shape="round" size="large" htmlType="button" onClick={onSubmitForm} loading={isSigningUp}>가입하기</Button>
                        </Col>
                    </Row>
                </Form>
            </Row>

        </div>
    );
};

export default Signup;
