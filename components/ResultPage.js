import React from 'react';
import { Result, Button } from 'antd';
import Router from 'next/router';

const ResultPage = (props) => {
  // status :boolean, target : string, data : object
  const [status, target, data] = props;

  return (
    <Result
      status={status ? 'success' : 'error'}
      title={`${target} 등록에 ${status ? '성공하였습니다.' : '실패하였습니다.'}`}
      subTitle={`${status ? data?.title ?? `${data?.name} 해당 정보로 등록되었습니다.` : '오류가 발생하여 관계자에게 문의 바랍니다.'} `}
      extra={[
        <Button type="primary" key="main" onClick={() => Router.push('/stadia')}>메인으로</Button>,
        <Button key="register" onClick={() => Router.push(`/${target === '팀' ? 'team/register' : 'stadium/register/location'}`)}>등록하기</Button>,
      ]}
    />
  );
};

export default ResultPage;
