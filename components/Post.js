import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Tooltip } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import style from '../SCSS/post.module.scss';
import PostImages from './PostImages';

const Post = ({ data }) => (
  <div className={style.postOutter}>
    <div className={style.writter}>
      <div className={style.avatar}>
        <Avatar>{data.User.nickname}</Avatar>
      </div>
      <div className={style.info}>
        <div className={style.title}>
          {data.User.nickname}
          <div className={style.extra}>
            <Tooltip
              title="테스트"
            >
              <EllipsisOutlined />
            </Tooltip>
          </div>
        </div>
        <div className={style.time}>
          {data.date.toString()}
        </div>
      </div>
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
    id: PropTypes.string,
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
