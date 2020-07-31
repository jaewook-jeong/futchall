import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const Thumnail = styled.div`
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
  background-color: #28242b;
  cursor: pointer;
`;

export const Centered = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transform: translate(50%,50%);
  -ms-transform: translate(50%,50%);
  transform: translate(50%,50%);
`;

export const ImageTag = styled.img`
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

export const CloseBtn = styled(CloseOutlined)`
  font-size: 20px;
  padding: 15px;
  cursor: pointer;
  opacity: 1;
  border-radius: 50%;
  background-color: #ccc;
  color: white;
  z-index: 100;
`;

export const PhotoSliderGlobal = createGlobalStyle`
.slick-arrow {
  height: 100% !important;
  background-color: #fafafa !important;
  min-width: 6% !important;
  max-width: 100px !important;
  top: 10px !important;
  opacity: 0 !important;
  z-index: 5;
  ::before {
    font-size: 25px !important;
    color: #000 !important;
  }
  :hover {
    opacity: 0.3 !important;
  }
}
.slick-next {
  right: 0 !important;
}
.slick-prev {
  left: 0 !important;
}
.ant-modal-close {
}
`;
