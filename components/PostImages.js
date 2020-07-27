import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
  const [modalImage, setModalImage] = useState(false);

  const onZoom = useCallback(() => {
    setModalImage(true);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
        {modalImage && <ImagesZoom images={images} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <img role="presentation" src={images[0].src} alt={images[0].src} width="50%" onClick={onZoom} />
          <img role="presentation" src={images[1].src} alt={images[1].src} width="50%" onClick={onZoom} />
        </div>
        {modalImage && <ImagesZoom images={images} />}
      </>
    );
  }
  return (
    <>
      <div>
        <img role="presentation" src={images[0].src} alt={images[0].src} width="50%" onClick={onZoom} />
        <div
          role="presentation"
          style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {modalImage && <ImagesZoom images={images} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;