import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import PhotoSlider from './PhotoSlider';
import { Thumnail, Centered, ImageTag } from '../SCSS/StyledComponents';

const PostImages = ({ images }) => {
  const [modalImage, setModalImage] = useState(false);

  const onZoom = useCallback(() => {
    setModalImage(true);
  }, []);

  if (images.length === 1) {
    return (
      <div style={{ width: '100%' }}>
        <Thumnail>
          <Centered>
            <ImageTag role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={`http://localhost:3065/${images[0].src}`} onClick={onZoom} />
          </Centered>
        </Thumnail>
        {modalImage && <PhotoSlider images={images} handler={setModalImage} visible={modalImage} />}
      </div>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div style={{ width: '50%', display: 'inline-block', borderRight: '1px solid #ddd' }}>
          <Thumnail>
            <Centered>
              <ImageTag role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={`http://localhost:3065/${images[0].src}`} onClick={onZoom} />
            </Centered>
          </Thumnail>
        </div>
        <div style={{ width: '50%', display: 'inline-block', borderLeft: '1px solid #ddd' }}>
          <Thumnail>
            <Centered>
              <ImageTag role="presentation" src={`http://localhost:3065/${images[1].src}`} alt={`http://localhost:3065/${images[1].src}`} onClick={onZoom} />
            </Centered>
          </Thumnail>
        </div>
        {modalImage && <PhotoSlider images={images} handler={setModalImage} visible={modalImage} />}
      </>
    );
  }
  return (
    <>
      <div style={{ width: '66.66666%', display: 'inline-block', borderRight: '1px solid #ddd' }}>
        <Thumnail>
          <Centered>
            <ImageTag role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={`http://localhost:3065/${images[0].src}`} onClick={onZoom} />
          </Centered>
        </Thumnail>
      </div>
      <div style={{ width: '33.33333%', display: 'inline-block', borderLeft: '1px solid #ddd' }}>
        <Thumnail style={{ borderBottom: '1px solid #ddd' }}>
          <Centered>
            <ImageTag role="presentation" src={`http://localhost:3065/${images[1].src}`} alt={`http://localhost:3065/${images[1].src}`} onClick={onZoom} />
          </Centered>
        </Thumnail>
        <Thumnail style={{ borderTop: '1px solid #ddd' }} onClick={onZoom}>
          <Centered>
            <ImageTag role="presentation" src={`http://localhost:3065/${images[2].src}`} alt={`http://localhost:3065/${images[2].src}`} />
          </Centered>
          {images[3]
          && (
            <div style={{
              position: 'absolute',
              textAlign: 'center',
              fontSize: '1.7rem',
              fontWeight: 600,
              color: '#fff',
              margin: 'auto',
              width: '50%',
              height: '50%',
              overflow: 'auto',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            >
              {/* <PlusOutlined /> */}
              <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <span style={{ alignSelf: 'center' }}>
                  +{images.length - 3}장
                </span>
              </div>
            </div>
          )}
        </Thumnail>
      </div>
      {modalImage && <PhotoSlider images={images} handler={setModalImage} visible={modalImage} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;
