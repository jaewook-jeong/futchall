import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Avatar, Tooltip, Popover, Button, Row, Col, Divider } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import style from '../SCSS/post.module.scss';
import PostImages from './PostImages';
import Comments from './Comments';
import { REMOVE_POST_REQUEST } from '../reducers/post';

const Post = ({ data }) => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user?.me);
  const { removePostLoading } = useSelector((state) => state.post);
  // const editPost = useCallback(() => {
  //   dispatch({
  //     type: 
  //   })
  // }, []);
  const deletePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: {
        id: data.id,
      },
    });
  }, [me]);
  return (
    <div className={style.postOutter}>
      <div className={style.writter}>
        <div className={style.avatar}>
          <Avatar
            src={data.User.Images[0] && `http://localhost:3065/${data.User.Images[0]?.src}`}
            alt={data.User.nickname}
            gap={3}
          >{!data.User.Images[0]?.src && data.User.nickname}
          </Avatar>
        </div>
        <div className={style.info}>
          <div className={style.title}>
            {data.User.nickname}
            {
              me?.id === data.UserId
              && (
              <div className={style.extra}>
                <Popover
                  placement="bottom"
                  trigger="click"
                  content={(
                    <Row>
                      <Col>
                        <Row>
                          <Button type="link">
                            수정하기
                          </Button>
                        </Row>
                        <Row>
                          <Button type="link" loading={removePostLoading} onClick={deletePost}>
                            삭제하기
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                  )}
                >
                  <EllipsisOutlined />
                </Popover>
              </div>
              )
            }
          </div>
          <div className={style.time}>
            <Tooltip title={moment(data.createdAt.toString()).locale('ko').format('YYYY-MM-DD HH:mm:ss')}>
              {moment(data.createdAt.toString()).locale('ko').fromNow()}
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={style.content}>
        {data.content}
      </div>
      <div className={style.multipart}>
        {
          data.Images.length !== 0
          && <PostImages images={data.Images} />
        }
      </div>
      <div className={style.comments}>
        <Comments comments={data.Comments} postId={data.id} />
      </div>
    </div>
  )
};

Post.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    UserId: PropTypes.number,
    User: PropTypes.object,
    date: PropTypes.any,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.array,
    Images: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default Post;
