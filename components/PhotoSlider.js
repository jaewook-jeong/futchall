import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Modal, Carousel, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Thumnail = styled.div`
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
  background-color: #28242b;
`;

const Centered = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transform: translate(50%,50%);
  -ms-transform: translate(50%,50%);
  transform: translate(50%,50%);
`;

const ImageTag = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100%;
  height: auto;
  -webkit-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
`;

const CloseBtn = styled(CloseOutlined)`
  font-size: 20px;
  padding: 15px;
  cursor: pointer;
  opacity: 1;
  border-radius: 50%;
  background-color: #ccc;
  color: white;
`;

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
                <ImageTag src={v.src} alt={v.src} />
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
