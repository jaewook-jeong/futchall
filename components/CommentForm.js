import React, { useCallback, useEffect } from 'react';
import { Form, Input, Avatar } from 'antd';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import { ADD_COMMENT_REQUEST, CLEAR_ADD_COMMENT_RESULT } from '../reducers/post';
import { backUrl } from '../config/config';

const CommentForm = ({ postId, toggleVisible, parentId }) => {
  const dispatch = useDispatch();
  const { me, token } = useSelector((state) => state.user);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const [form] = Form.useForm();

  useEffect(() => {
    if (addCommentDone) {
      form.resetFields(['commentText']);
      if (toggleVisible) {
        toggleVisible(false);
      }
      dispatch({ type: CLEAR_ADD_COMMENT_RESULT });
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: form.getFieldValue('commentText'), postId, parentId },
      token,
    });
  }, [me.id]);

  return (
    <Form
      form={form}
      style={{ marginBottom: '-19px', width: '100%' }}
      hideRequiredMark
      onFinish={onSubmitComment}
    >
      <Form.Item
        label={<Avatar shape="circle" src={`${backUrl}/${me?.Images[0]?.src}`}>{!me.Images[0]?.src && me.nickname}</Avatar>}
        colon={false}
        name="commentText"
        required
      >
        <Input
          style={{ border: '1px solid #f0f0f0', borderRadius: '15px', backgroundColor: '#fafafa', color: '#000000d9' }}
          placeholder="댓글을 입력하세요"
          autoComplete="off"
        />
      </Form.Item>
      {addCommentLoading && <LoadingOutlined /> }
    </Form>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  toggleVisible: PropTypes.func,
  parentId: PropTypes.number,
};

export default CommentForm;
