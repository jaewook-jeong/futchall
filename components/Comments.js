import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';

import CommentForm from './CommentForm';
import CommentComp from './CommentComp';

const Comments = (data) => {
  const { me } = useSelector((state) => state.user, shallowEqual);

  return (
    <>
      {
        // CommentComp
      }
      {me && <CommentForm postId={data.postId} />}
    </>
  );
};

Comments.propTypes = {
  data: PropTypes.shape({
    postId: PropTypes.number.isRequired,
    comments: PropTypes.array,
  }),
};

export default Comments;