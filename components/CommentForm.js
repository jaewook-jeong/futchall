import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button, Avatar } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = (props) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const form = Form.useForm();

  useEffect(() => {
    if (addCommentDone) {
      
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: props.postId, parentId: props?.parentId, userId: me.id },
    });
  }, [commentText, id]);

  return (
    <Form
      form={form}
      hideRequiredMark
      onFinish={onSubmitComment}
    >
      <Form.Item
        label={<Avatar shape="circle">{me?.nickname}</Avatar>}
        colon={false}
        name="commentText"
        required
      >
        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 3 }}
          style={{ border: '1px solid #f0f0f0', borderRadius: '15px', backgroundColor: '#fafafa', color: '#000000d9' }}
          placeholder="댓글을 입력하세요"
        />
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  props: PropTypes.object.isRequired,
};

export default CommentForm;