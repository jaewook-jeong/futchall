import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';

// is not used
const tabList = [
    {
        key: 'tab1',
        tab: '위치',
    },
    {
        key: 'tab2',
        tab: '상세',
    },
    {
        key: 'tab3',
        tab: '사진',
    },
    {
        key: 'tab4',
        tab: '후기',
    },
];

const contentList = {
    tab1: <p>위치</p>,
    tab2: <p>상세</p>,
    tab3: <p>사진</p>,
    tab4: <p>후기</p>
};


const StadiumInfo = () => {
    const [key, setKey] = useState('tab1');
    const onTabChange = (key) => {
        setKey(key);
    }
    return (
        <div>
            <Row>
                <Col style={{ width: '100%' }}>
                    <Card
                        style={{ width: '100%' }}
                        title="구장 상세정보"
                        extra={<a href="#"><HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: '24px' }} /></a>}
                        defaultActiveTabKey={key}
                        tabList={tabList}
                        activeTabKey={key}
                        onTabChange={key => {
                            onTabChange(key);
                        }
                        }
                    >
                        {contentList[key]}
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
export default StadiumInfo;