import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { List, Tag } from 'antd';

const StadiumList = (props) => {
    return (
        <List
            header={<div style={{ fontSize: 20, fontWeight: "bold", paddingLeft: '16px' }}>구장 리스트</div>}
            style={{ height: '70vh' }}
            size="small"
            itemLayout="vertical"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                showLessItems: true,
            }}
            dataSource={props.list}
            renderItem={item => (
                <List.Item
                    key={item.req}
                    style={{ textOverflow: "ellipsis", overflow: "auto", whiteSpace: "nowrap" }}
                >
                    <List.Item.Meta
                        title={<Link href="/stadium/[id]" as={`/stadium/${item.req}`} ><a>{item.title}</a></Link>}
                        description={item.tag.map((c) => {
                            return (<Tag key={c}>#{c}</Tag>)
                        })}
                        style={{ textOverflow: "ellipsis", overflow: "auto", whiteSpace: "nowrap" }}
                    />
                </List.Item >
            )}
        >
        </List >
    )
}

export default StadiumList;