import produce from '../util/produce';

export const initialState = {
  latitude: '37.5795876', // 현재 보는 지도의 위도
  longitude: '126.9636324', // 현재 보는 지도의 경도
  stadiumList: [],
  // Stadium:{} 이렇게 바꿔야 할 필요가 있을거야
  isChangingLocation: false,
  isChangedLocation: false,
  changeLocationErrorReason: '',
};
export const REFRESH_STADIUMLIST_REQUEST = 'REFRESH_STADIUMLIST_REQUEST';
export const REFRESH_STADIUMLIST_SUCCESS = 'REFRESH_STADIUMLIST_SUCCESS';
export const REFRESH_STADIUMLIST_FAILURE = 'REFRESH_STADIUMLIST_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case REFRESH_STADIUMLIST_REQUEST:
      draft.latitude = action.data.latitude;
      draft.longitude = action.data.longitude;
      draft.isChangingLocation = true;
      draft.isChangedLocation = false;
      break;
    case REFRESH_STADIUMLIST_SUCCESS:
      draft.isChangingLocation = false;
      draft.isChangedLocation = true;
      draft.stadiumList = action.data;
      break;
    case REFRESH_STADIUMLIST_FAILURE:
      draft.isChangingLocation = false;
      draft.isChangedLocation = false;
      draft.changeLocationErrorReason = action.error;
      break;
    default:
      break;
  }
});
