import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'antd';

import CommentForm from './CommentForm';

const CommentComp = ({ data }) => {
  const [toggleReply, onToggleRply] = useState(false);
  const setToggleReply = useCallback(() => {
    onToggleRply(true);
  }, []);
  return (
    <>
      <Comment
        key={data.id}
        actions={[<span onClick={setToggleReply}>답글 달기</span>]}
        author={<a>{data.Users.nickname}</a>}
        avatar={
          <Avatar
            src={data.Users.src}
            alt={data.Users.nickname}
          />
        }
        content={
          <p>
            {data.content}
          </p>
        }
      />
      {toggleReply && <CommentForm postId={data.postId} parentId={data.parentId} />}
    </>
  );
};

CommentComp.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    Users: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
  }),
};

export default CommentComp;
