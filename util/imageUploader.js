import { post } from 'axios';

const imageUploader = (url, file) => {
  const formdata = new FormData();
  formdata.append('image', file);
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
    withCredentials: true,
  };
  return (
    post(url, formdata, config)
  );
};

export default imageUploader;
