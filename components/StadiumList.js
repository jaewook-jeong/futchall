import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { List, Tag, Table, Typography, Tooltip, Menu } from 'antd';
import {FlagOutlined} from '@ant-design/icons';
import styles from '../SCSS/stadiumList.module.scss';

const StadiumList = (props) => {
    const  {list, onChangeSelected}  = props;

    // const columns = [
    //     {
    //         title: '구장명',
    //         dataIndex: 'title',
    //         render: (text, record, index) => (<span>
    //                 <div>
    //                     <Link href="/stadium/[id]" as={`/stadium/${record['req']}`} ><a>{text}</a></Link>
    //                 </div>
                    
    //                 <div>
    //                     {record['tag'].map((v)=>{
    //                         return <Tag key={v}>#{v}</Tag>;
    //                     })}
    //                 </div>
    //             </span>),
    //     },
    //     {
    //         title: '점령',
    //         dataIndex: 'occupation',
    //         render:(v)=>{if(v === "Y") {return <Tooltip title="점령중입니다!"><FlagOutlined/></Tooltip>} }
    //     },
    // ];
    return (
        <Menu
            mode="inline"
            onClick={e=>onChangeSelected(e['key'])}
            style={{height:'70vh', overflow:'auto'}}
        >
            <Menu.SubMenu
                key="main"
                title={"구장 리스트"}
                
            >
                {list.map((v,i)=>{
                    return(
                    <Menu.Item key={i} className={styles.stadiumInfo}>
                        <div className={styles.flag}>
                            {v.occupation === "Y" && <FlagOutlined style={{fontSize:'20px'}}/>}
                        </div>
                        <div className={styles.details}>
                            <div className={styles.title}>
                                {/* <Link href="/stadium/[id]" as={`/stadium/${v.req}`} ><a></a></Link> */}
                                {v.title}
                            </div>
                            <div className={styles.tags}>
                                {v.tag.map((c)=>{return <Tag key={c}>#{c}</Tag>;})}
                            </div>
                        </div>
                    </Menu.Item>)
                })}
            </Menu.SubMenu>
        </Menu>
        // <Table
        //     columns={columns}
        //     dataSource={list}
        //     showHeader={false}
        //     rowKey={(rec)=> rec.req}
        //     pagination={{pageSize:5}}
        //     size="middle"
        //     style={{cursor:'pointer'}}
        //     rowSelection={{
        //         type:"radio",
        //         hideSelectAll:true,
        //         selections:false,
        //         // renderCell:(checked, record, index, originNode) =>{}
        //     }}
        //     onRow={(rec, index)=>{
        //         return{
        //             onClick: ev=> { onChangeSelected(index)},
        //         }
        //     }}
        // />
        // <List
        //     header={<div style={{ fontSize: 20, fontWeight: "bold", paddingLeft: '16px' }}>구장 리스트</div>}
        //     style={{ height: '70vh' }}
        //     size="small"
        //     itemLayout="vertical"
        //     pagination={{
        //         onChange: page => {
        //             console.log(page);
        //         },
        //         showLessItems: true,
        //     }}
        //     dataSource={list}
        //     renderItem={(item, index) => (
        //         <List.Item
        //             key={item.req}
        //             onClick={()=>onChangeSelected(index)}
        //             style={{ textOverflow: "ellipsis", overflow: "auto", whiteSpace: "nowrap", cursor:'pointer' }}
        //         >
        //             <List.Item.Meta
        //                 title={<Link href="/stadium/[id]" as={`/stadium/${item.req}`} ><a>{item.title}</a></Link>}
        //                 description={item.tag.map((c) => {
        //                     return (<Tag key={c}>#{c}</Tag>)
        //                 })}
        //                 style={{ textOverflow: "ellipsis", overflow: "auto", whiteSpace: "nowrap" }}
        //             />
        //         </List.Item >
        //     )}
        // >
        // </List >
    )
}

export default StadiumList;