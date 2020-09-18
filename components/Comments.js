import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';
import { Button, Divider } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

import CommentForm from './CommentForm';
import CommentComp from './CommentComp';

const Comments = (data) => {
  const { me } = useSelector((state) => state.user, shallowEqual);
  const [visiblity, setVisiblity] = useState(false);

  const CommentStructure = useCallback((comments) => {
    const result = JSON.parse(JSON.stringify(comments));
    let index = result.length - 1;
    while (index >= 0) {
      if (result[index].ParentId) {
        const children = result[index];
        result.find((element, i) => {
          if (element.id === children.ParentId) {
            if (result[i].children) {
              result[i].children.push(children);
            } else {
              result[i].children = [children];
            }
            return true;
          }
          return false;
        });
        result.splice(index, 1);
      }
      index -= 1;
    }
    return result;
  }, [data]);

  return (
    <>
      {
        (data.comments.length !== 0 && !visiblity)
          ? <Divider orientation="left" plain><Button icon={<MessageOutlined />} type="text" onClick={() => setVisiblity(true)}>댓글 {data.comments.length}개 더보기</Button></Divider>
          : <Divider />
      }
      {
        visiblity && (CommentStructure(data.comments).map((v) => <CommentComp data={v} key={v.id} />))
      }
      {me && <CommentForm postId={data.postId} />}
    </>
  );
};

Comments.propTypes = {
  data: PropTypes.shape({
    postId: PropTypes.number.isRequired,
    comments: PropTypes.array,
  }).isRequired,
};

export default Comments;