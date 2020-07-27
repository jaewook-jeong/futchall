import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import style from '../SCSS/post.module.scss';
import PostImages from './PostImages';

const Post = ({ data }) => (
  <div className={style.postOutter}>
    <div className={style.writter}>
      <Card
        extra={<Button><EllipsisOutlined /></Button>}
      >
        <Card.Meta
          avatar={<Avatar>{data.User.nickname}</Avatar>}
          title={data.User.nickname}
          description={data.date}
        />
      </Card>
    </div>
    <div className={style.content}>
      {data.content}
    </div>
    <div className={style.multipart}>
      {
        data.Images[0]
        && <PostImages images={data.Images} />
      }
    </div>
    <div className={style.comments}>

    </div>
  </div>
);

Post.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    date: PropTypes.any,
    UserId: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default Post;
