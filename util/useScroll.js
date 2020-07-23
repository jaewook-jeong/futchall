import { useState } from 'react';

const useScroll = () => {
  // infinte scroll

  const onScroll = () => {
    window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300;
  }
};

export default useScroll;
