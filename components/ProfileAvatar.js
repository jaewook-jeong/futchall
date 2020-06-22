import { useSelector, useDispatch} from 'react-redux';
import Link from 'next/link';
import { Popover, List, Avatar, Descriptions, Tabs, Button, message, Card } from 'antd';
import { SettingOutlined, RightOutlined, DeleteOutlined } from '@ant-design/icons';
import  Router  from 'next/router';
import { LOG_OUT_REQUEST } from '../reducers/user';


const ProfileAvatar = () => {
    const { me } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const onLogOut = () => {
        dispatch({type: LOG_OUT_REQUEST});
        message.info("정상적으로 로그아웃되었습니다.")
    };
    const CardTabs = (
        <Tabs type="card" size="small" defaultActiveKey="2" style={{width:'250px'}}>
            <Tabs.TabPane tab="최근 본 구장" key="1">
                <List
                    footer={<Button size="small" shape="round" onClick={()=>alert("삭제")} block><DeleteOutlined/>최근 본 구장 삭제하기</Button>}
                    // itemLayout="vertical"
                    pagination={{pageSize:3}}
                    dataSource={[{title:"누상동 다목적 운동장", address:"서울-종로", src:''},{title:"서대문 돌산구장", address:"서울-서대문", src:''}, ]}
                    renderItem={item=>(
                        <List.Item>
                            <Card style={{width:'100%'}} size="small">
                                <Card.Meta
                                    avatar={<Avatar src={item.src ?? 'https://www.americaskidsinmotion.com/wp-content/uploads/2016/05/product-soccer-ball.jpg'}/>}
                                    title={item.title}
                                    description={item.address}
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="회원정보" key="2">
                <Descriptions layout="horizontal" column={1} style={{width:'200px'}} colon={false} >
                    <Descriptions.Item label="닉네임">{me.nickname}</Descriptions.Item>
                    <Descriptions.Item label="아이디">{me.id}</Descriptions.Item>
                    {me.club && <Descriptions.Item label="팀">{me.clubname}   <Link href={`/team/${me.club}`}><a><SettingOutlined/></a></Link></Descriptions.Item> }
                </Descriptions>
                <Button size="default" block style={{borderRadius:'5px'}} onClick={onLogOut}>로그아웃</Button>
            </Tabs.TabPane>
            <Tabs.TabPane tab="계정관리" key="3">
                <Button block style={{border:0, borderBottom:'1px solid #dadce0'}} onClick={()=>Router.push(`/user/profile`)}>회원정보 수정<RightOutlined style={{float:'right',lineHeight:'25px'}}/></Button>
                <Button block style={{border:0, borderBottom:'1px solid #dadce0'}} onClick={()=> Router.push(`/user/altpwd`)}>비밀번호 변경<RightOutlined style={{float:'right',lineHeight:'25px'}}/></Button>
                <Button block style={{border:0, borderBottom:'1px solid #dadce0'}}>사진 변경<RightOutlined style={{float:'right',lineHeight:'25px'}}/></Button>
            </Tabs.TabPane>
        </Tabs>
        );
    return (
        <Popover placement="rightTop" trigger="click" content={CardTabs} >
            <Avatar shape="circle" >{me.nickname}</Avatar>
        </Popover>
    );
}

export default ProfileAvatar;