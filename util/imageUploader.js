import { post } from 'axios';

const imageUploader = (url, file, token) => {
  const formdata = new FormData();
  formdata.append('image', file);
  const config = {
    headers: {
              'content-type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
              Host: "api.futchall.com",
              Origin: "https://futchall.com"
              },
  };
  return (
    post(url, formdata, config)
  );
};

export default imageUploader;
