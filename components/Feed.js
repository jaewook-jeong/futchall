import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import { Empty } from 'antd';

import PostForm from './PostForm';
import Post from './Post';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Feed = (props) => {
  const { where, req } = props;
  const { me } = useSelector((state) => state.user, shallowEqual);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
      data: {
        where,
        id: req,
        lastId: mainPosts[mainPosts.length - 1]?.id,
      },
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
            data: {
              where,
              id: req,
              lastId: mainPosts[mainPosts.length - 1]?.id,
            },
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading]);

  return (
    <>
      {me && <PostForm where={where} req={req} />}
      {mainPosts.map((v) => (
        <Post key={v.id} data={v} />
      ))}
      {mainPosts.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </>
  );
};

Feed.propTypes = {
  props: PropTypes.shape({
    where: PropTypes.string.isRequired,
    req: PropTypes.number.isRequired,
  }).isRequired,
};

export default Feed;
