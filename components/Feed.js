import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {  } from 'antd';
import PropTypes from 'prop-types';

import PostForm from './PostForm';

const Feed = (props) => {
  const { where, req } = props;
  const { me } = useSelector((state) => state.user, shallowEqual);
  return (
    <>
      {/* {me && <PostForm where={where} req={req} />} */}
      <PostForm where={where} req={req} />

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
