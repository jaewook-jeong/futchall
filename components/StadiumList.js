import React from 'react';
import Link from 'next/link';
import { Tag, Tooltip, Menu, Row, Col } from 'antd';
import {FlagOutlined, FlagTwoTone} from '@ant-design/icons';
import styles from '../SCSS/stadiumList.module.scss';

const StadiumList = (props) => {
    const  {list, onChangeSelected, nowSelected}  = props;
    return (
        <Menu
            mode="inline"
            onClick={e=>onChangeSelected(e['key'])}
            style={{maxHeight:'70vh'}}
            inlineIndent={15}
            defaultOpenKeys={["main"]}
            selectedKeys={[`${nowSelected}`]}
        >
            <Menu.SubMenu
                key="main"
                title={"구장 리스트"}
            >
                {list.map((v,i)=>{
                    return(
                    <Menu.Item key={i} className={styles.stadiumInfo}>
                        <Row style={{overflow:'auto'}}>
                            <Col className={styles.flag}>
                                {v.occupation === "Y" ? <Tooltip title="점령중입니다"><FlagTwoTone twoToneColor="red" style={{fontSize:'20px'}}/></Tooltip> : <FlagOutlined style={{fontSize:'20px'}}/>}
                            </Col>
                            <Col className={styles.details}>
                                <Row className={styles.title}>
                                    {/* <Link href="/stadium/[id]" as={`/stadium/${v.req}`} ><a>{v.title}</a></Link> */}
                                    {v.title}
                                </Row>
                                <Row className={styles.tags} >
                                    {v.tag.map((c)=>{return <Tag key={c}>#{c}</Tag>;})}
                                </Row>
                            </Col>
                        </Row>
                        
                    </Menu.Item>)
                })}
            </Menu.SubMenu>
        </Menu>
    )
}

export default StadiumList;