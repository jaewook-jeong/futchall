import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';
import moment from 'moment';
import { Comment, Avatar, Tooltip } from 'antd';

import CommentForm from './CommentForm';
import { CommentGlobal as Global } from '../SCSS/StyledComponents';

const CommentComp = (comment) => {
  const [toggleReply, onToggleRply] = useState(false);
  const { me } = useSelector((state) => state.user, shallowEqual);
  const setToggleReply = useCallback(() => {
    onToggleRply(!toggleReply);
  }, [toggleReply]);
  return (
    <>
      <Global />
      <Comment
        key={comment.data.id}
        actions={me && [<span onClick={setToggleReply}>답글 달기</span>]}
        author={<a>{comment.data.User.nickname}</a>}
        datetime={(
          <Tooltip title={moment(comment.data.createdAt.toString()).locale('ko').format('YYYY-MM-DD HH:mm:ss')}>
            {moment(comment.data.createdAt.toString()).locale('ko').fromNow()}
          </Tooltip>
        )}
        avatar={(
          <Avatar
            src={`http://localhost:3065/${comment.data.User.Images[0]?.src}`}
            alt={comment.data.User.nickname}
          >{!comment.data.User.Images[0]?.src && comment.data.User.nickname}
          </Avatar>
        )}
        content={(
          <p>
            {comment.data.content}
          </p>
        )}
      >
        {comment.data?.children?.map((v) => <CommentComp data={v} key={v.id} />)}
      </Comment>
      {toggleReply && <CommentForm postId={comment.data.PostId} parentId={comment.data.id} />}
    </>
  );
};

// CommentComp.propTypes = {
//   comment: PropTypes.shape({
//     data: PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       Users: PropTypes.object.isRequired,
//       content: PropTypes.string.isRequired,
//     }),
//     children: PropTypes.object,
//   }).isRequired,
// };

export default CommentComp;
