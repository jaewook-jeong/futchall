const getLocation = async () => {
  try {
    return await new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          resolve(['success', '현재 접속위치를 중심으로 지도를 활성화하였습니다.', pos.coords.latitude, pos.coords.longitude]);
        }, (pos) => {
          resolve(['warn', '위치정보제공을 동의하고 현재위치 주변 구장을 확인하세요.']);
        }, { enableHighAccuracy: true, timeout: 10000 });
      } else {
        resolve(['error', '현재 브라우저에서는 현재위치 사용이 불가능합니다.']);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export default getLocation;
