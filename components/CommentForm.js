import React, { useCallback, useEffect } from 'react';
import { Form, Input, Avatar } from 'antd';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = (props) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const [form] = Form.useForm();

  useEffect(() => {
    if (addCommentDone) {
      form.resetFields(['commentText']);
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: form.getFieldValue('commentText'), postId: props.postId, parentId: props?.parentId, userId: me.id },
    });
  }, [me.id]);

  return (
    <Form
      form={form}
      style={{ padding: '0 10px', marginBottom: '-19px', width: '100%' }}
      hideRequiredMark
      onFinish={onSubmitComment}
    >
      <Form.Item
        label={<Avatar shape="circle">{me?.nickname}</Avatar>}
        colon={false}
        name="commentText"
        required
      >
        <Input
          style={{ border: '1px solid #f0f0f0', borderRadius: '15px', backgroundColor: '#fafafa', color: '#000000d9' }}
          placeholder="댓글을 입력하세요"
        />
      </Form.Item>
      {addCommentLoading && <LoadingOutlined /> }
    </Form>
  );
};

CommentForm.propTypes = {
  props: PropTypes.object.isRequired,
};

export default CommentForm;