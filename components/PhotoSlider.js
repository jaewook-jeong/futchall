import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Modal, Carousel, Tooltip } from 'antd';
import { Thumnail, Centered, ImageTag, CloseBtn, PhotoSliderGlobal as Global } from '../SCSS/StyledComponents';

const PhotoSlider = ({ images, handler, visible }) => {
  const closeBtn = useCallback(() => {
    handler(false);
  }, []);

  return (
    <Modal
      centered
      width="85vh"
      bodyStyle={{ height: '85vh' }}
      visible={visible}
      closeIcon={<Tooltip title="닫으려면 버튼을 누르세요"><CloseBtn onClick={closeBtn} /></Tooltip>}
      footer={null}
      keyboard
    >
      <Global />
      <Carousel
        adaptiveHeight
        arrows
        draggable
        infinite={false}
        lazyLoad="progressive"
        swipeToSlide
      >
        {images.map((v) => (
          <div key={v.src}>
            <Thumnail>
              <Centered>
                <ImageTag src={`${v.src.replace(/\/thumb\//, '/original/')}`} alt={`${v.src}`} />
              </Centered>
            </Thumnail>
          </div>
        ))}
      </Carousel>
    </Modal>
  );
};
PhotoSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  handler: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default PhotoSlider;
