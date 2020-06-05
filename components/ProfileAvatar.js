import { useSelector} from 'react-redux';
import { Popover, Card, List, Avatar } from 'antd';
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
    latest: <List></List>,
    info: <a></a>
};

const ProfileAvatar = () => {
    const { me } = useSelector(state => state.user);
    const CardTabs = (<Card
        tabList={tabList}
    // activeTabKey={}
    >
    </Card>);
    return (
        <Popover placement="bottom" trigger="hover" content={CardTabs}>
            <Avatar shape="circle" >{me.nickname}</Avatar>
        </Popover>
    );
}

export default ProfileAvatar;