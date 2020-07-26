import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { Overlay, Global, CloseBtn, ImgWrapper, Indicator, SlickWrapper } from './styles';
// import { backUrl } from '../../config/config';

const ImagesZoom = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Modal
      bodyStyle={{ height: '100vh', backgroundColor: '#000000cc' }}
      centered
      closeIcon={<CloseBtn><CloseOutlined /></CloseBtn>}
      footer={null}
      width="100vw"
      style={{ opacity: 0.6 }}
    >
      <Overlay>
        <Global />
        <SlickWrapper>
          <div>
            <Slick
              initialSlide={0}
              beforeChange={(slide) => setCurrentSlide(slide)}
              infinite
              dots
              slidesToShow={1}
              slidesToScroll={1}
            >
              {images.map((v) => (
                <ImgWrapper key={v.src}>
                  <img src={v.src} alt={v.src} />
                </ImgWrapper>
              ))}
            </Slick>
            <Indicator>
              <div>
                {currentSlide + 1}
                {' '}
                /
                {images.length}
              </div>
            </Indicator>
          </div>
        </SlickWrapper>
      </Overlay>
    </Modal>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImagesZoom;