import { useSelector} from 'react-redux';
import Link from 'next/link';
import { Popover, List, Avatar, Descriptions, Tabs, Tooltip, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import  Router  from 'next/router';

const ProfileAvatar = () => {
    const { me } = useSelector(state => state.user);
    const CardTabs = (
        <Tabs type="card">
            <Tabs.TabPane tab="최근 본 구장" key="1">
                <List>

                </List>
            </Tabs.TabPane>
            <Tabs.TabPane tab="회원정보" key="2">
                <Descriptions layout="horizontal" column={1} style={{width:'200px'}} colon={false}>
                    <Descriptions.Item label="닉네임"><Space size={"large"}>{me.nickname}  <Tooltip title="회원정보 수정하기"><SettingOutlined onClick={()=>Router.push(`/profile`)}/></Tooltip></Space></Descriptions.Item>
                    <Descriptions.Item label="아이디">{me.id}</Descriptions.Item>
                    {me.club && <Descriptions.Item><Link href={`/team/${me.club}`}><a>팀 바로가기</a></Link></Descriptions.Item>}
                </Descriptions>
            </Tabs.TabPane>
        </Tabs>
        );
    return (
        <Popover placement="rightTop" trigger="click" content={CardTabs}>
            <Avatar shape="circle" >{me.nickname}</Avatar>
        </Popover>
    );
}

export default ProfileAvatar;