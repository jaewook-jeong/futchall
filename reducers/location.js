import produce from '../util/produce';

export const initialState = {
  latitude: '', // 접속자의 위치
  longitude: '', // 접속자의 위치
  stadiumList: [],
  isChangingLocation: false,
  isChangedLocation: false,
  changeLocationErrorReason: null,
};
export const REFRESH_STADIUMLIST_REQUEST = 'REFRESH_STADIUMLIST_REQUEST';
export const REFRESH_STADIUMLIST_SUCCESS = 'REFRESH_STADIUMLIST_SUCCESS';
export const REFRESH_STADIUMLIST_FAILURE = 'REFRESH_STADIUMLIST_FAILURE';

export const SET_WHERE_USER = 'SET_WHERE_USER';

export default (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SET_WHERE_USER:
      draft.latitude = action.data.latitude;
      draft.longitude = action.data.longitude;
      break;
    case REFRESH_STADIUMLIST_REQUEST:
      draft.isChangingLocation = true;
      draft.isChangedLocation = false;
      draft.changeLocationErrorReason = null;
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
