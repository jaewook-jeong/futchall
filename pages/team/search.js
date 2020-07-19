import React, { useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, List, Typography, Button, Tag, Tooltip } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

import { SEARCH_TEAMS_REQUEST } from '../../reducers/team';
import AppLayout from '../../components/AppLayout';

const Search = (props) => {
  const dispatch = useDispatch();
  const { teamList, isSearched, query, isSearching } = useSelector((state) => state.team);
  // const[hashPage, setHashPage] = useState(1);
  useEffect(
    () => {
      dispatch({ type: SEARCH_TEAMS_REQUEST, data: { query: props.router.query.q ?? `지역검색 : ${props.router.query.loc}` } });
    }, [props.router.query]);

  // useCallback(
  //   ()=>{
  //     setHashPage(window.location.hash.substr(1));
  //     console.log(hashPage);
  //   },[]
  // )

  // useEffect(
  //   () => {
  //   console.log(window.location.hash.substr(1));
  //   setHashPage(Number(window.location.hash.substr(1)));
  //   console.log(hashPage,"jaeewook");
  // },[window.location.hash.substr(1)]);

  return (
    <AppLayout>
      <Row>
        <Col xs={{ span: 22, offset:1 }} md={{ span: 20, offset: 2 }}>
          <Typography.Title level={4}>"{query}"에 대한 검색 결과입니다.</Typography.Title>  
            {
              !isSearched 
                ? <List loading={true} /> 
                : <List
                    loading={isSearching}
                    itemLayout="vertical"
                    pagination={{onChange:page=>{/*window.location.hash = page*/ console.log(page)}, pageSize: 10,}}
                    bordered={false}
                    dataSource={teamList}
                    size="small"
                    footer={
                      <div>
                        <b>{teamList.length}건</b>의 검색결과
                      </div>
                    }
                    renderItem={item=>(
                      <List.Item
                        key={item.req}
                        actions={[
                          <Tooltip title="현재 점령중인 구장 수" key={item.occupation}><LikeOutlined/>{item.occupation}</Tooltip>,
                          <Tag key={item.location} >#{item.location}</Tag>,
                          <Tag key={item.recruit} hidden={item.recruit !== "Y" }>#모집중</Tag> 
                        ]}
                          extra={
                            <img
                              width={172}
                              alt="logo"
                              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                          }
                      >
                        <List.Item.Meta 
                          title={<Button type="link" onClick={()=>Router.push(`/team/${item.req}`)}>{item.name}</Button> }
                          // title={<Link href={`/team/${item.req}`} as={`/team/${item.req}`}><a>{item.name}</a></Link>}
                          description={item.description}
                        />
                      </List.Item>
                    )
                  }
                />
            }
        </Col>
      </Row>
    </AppLayout>
  );
}

export default withRouter(Search);
