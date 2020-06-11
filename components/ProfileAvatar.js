import { useSelector} from 'react-redux';
import Link from 'next/link';
import { Popover, Card, List, Avatar, Descriptions } from 'antd';
// import { UserOutlined } from '@ant-design/icons';

const tabList = [
    {
        key: "latest",
        tab: "최근 본 구장"
    },
    {
        key: "info",
        tab: "회원정보"
    },
]
const contentList = {
    latest: 
    <List>

    </List>,
    info: 
    <Descriptions>
        <Descriptions.Item label="닉네임"></Descriptions.Item>
        <Descriptions.Item label="아이디"></Descriptions.Item>
        {/* {me.club && <Descriptions.Item><Link href={`/team/${me.club}`}><a>팀 바로가기</a></Link></Descriptions.Item>} */}
    </Descriptions>
};

const ProfileAvatar = () => {
    const { me } = useSelector(state => state.user);
    const CardTabs = (<Card
        tabList={tabList}
    // activeTabKey={}
    >
        {contentList["info"]}
    </Card>);
    return (
        <Popover placement="bottom" trigger="click" content={CardTabs}>
            <Avatar shape="circle" >{me.nickname}</Avatar>
        </Popover>
    );
}

export default ProfileAvatar;