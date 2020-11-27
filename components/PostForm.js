import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Avatar, Input, Button, Divider, Space, Upload, Modal, message } from 'antd';
import styled from 'styled-components';
import { FileImageOutlined, PlusOutlined } from '@ant-design/icons';

import { ADD_POST_REQUEST } from '../reducers/post';
import imageUploader from '../util/imageUploader';
import getBase64 from '../util/getBase64';
import { backUrl } from '../config/config';

const PostFormDiv = styled.div`
  border-radius: 15px;
  padding: 15px;
  border: 1px solid #f0f0f0;
  height: auto;
  margin-bottom: 10px;
  background-color: #fff;
`;
const PostForm = ({ where, req }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { me, token } = useSelector((state) => state.user, shallowEqual);
  const { addPostLoading, addPostDone } = useSelector((state) => state.post, shallowEqual);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [imageList, setImagelist] = useState([]);
  const [dbImage, setDbImage] = useState([]);

  const onSubmit = useCallback(() => {
    if (dbImage || form.getFieldValue('content')) {
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          content: form.getFieldValue('content'),
          where,
          req,
          image: dbImage,
        },
        token,
      });
    } else {
      message.info('글을 작성하시거나 사진을 등록해주세요!');
    }
  }, [dbImage]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  useEffect(() => {
    if (addPostDone) {
      form.resetFields(['content']);
      setUploadImage(false);
      setDbImage([]);
      setImagelist([]);
    }
  }, [addPostDone]);
  return (
    <PostFormDiv>
      <Form
        form={form}
        hideRequiredMark
        encType="multipart/form-data"
        onFinish={onSubmit}
      >
        <Form.Item
          label={(
            <Avatar
              src={me.Images[0] && `${me.Images[0]?.src}`}
              alt={me.nickname}
            >{!me.Images[0]?.src && me.nickname}
            </Avatar>
          )}
          labelCol={{flex: '42px'}}
          wrapperCol={{flex: 'auto'}}
          colon={false}
          name="content"
          required
          // rules={[{ required: trued, message: '무슨 말을 하고 싶으신가요?' }]}
        >
          <Input.TextArea
            autoSize={{ minRows: 2, maxRows: 10 }}
            style={{ border: '1px solid #f0f0f0', borderRadius: '15px', backgroundColor: '#fafafa', color: '#000000d9' }}
            placeholder="무슨 생각을 하고 계신가요?"
          />
        </Form.Item>
        { uploadImage
          && (
          <Form.Item>
            <Upload
              listType="picture-card"
              customRequest={(data) => {
                imageUploader(`${backUrl}/post/images`, data.file, token)
                .then(response => {
                  setDbImage(dbImage.concat(response.data[0]));
                  data.onSuccess();
                })
                .catch(error => {
                  console.log('Error fetching profile ' + error)
                  data.onError("Error uploading image")
                })
              }}
              onChange={({ fileList }) => setImagelist(fileList.map((v) => {
                return {...v, url: v.url.replace(/\/thumb\//, '/original/')};
              }))}
              fileList={imageList}
              onPreview={(file) => handlePreview(file)}
              onRemove={(file) => {
                let index = -1;
                setImagelist(imageList.filter((v, i) => {
                  if (v.uid !== file.uid) {
                    return true;
                  }
                  index = i;
                  return false;
                }));
                setDbImage(dbImage.filter((v, i) => i !== index));
              }}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={() => setPreviewVisible(false)}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form.Item>
          )}
        <Divider />
        <Form.Item
          style={{ marginBottom: 0, textAlign: 'right' }}
        >
          <Space>
            <Button type="default" htmlType="button" shape="round" onClick={() => setUploadImage(true)}><FileImageOutlined />사진</Button>
            <Button type="primary" htmlType="submit" shape="round" loading={addPostLoading}>게시하기</Button>
          </Space>
        </Form.Item>
      </Form>
    </PostFormDiv>
  );
};

PostForm.propTypes = {
  where: PropTypes.string.isRequired,
  req: PropTypes.string.isRequired,
};

export default PostForm;
