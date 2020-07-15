export const initialState = {
    latitude: "37.5795876", //현재 보는 지도의 위도
    longitude: "126.9636324",//현재 보는 지도의 경도
    stadiumList: [],
    //Stadium:{} 이렇게 바꿔야 할 필요가 있을거야
    isChangingLocation:false,
    isChangedLocation:false,
    changeLocationErrorReason:'',
}
export const REFRESH_STADIUMLIST_REQUEST = 'REFRESH_STADIUMLIST_REQUEST';
export const REFRESH_STADIUMLIST_SUCCESS = 'REFRESH_STADIUMLIST_SUCCESS';
export const REFRESH_STADIUMLIST_FAILURE = 'REFRESH_STADIUMLIST_FAILURE';

export default (state = initialState, action) => {
    switch (action.type) {
        case REFRESH_STADIUMLIST_REQUEST: {
            return {
                ...state,
                latitude: action.data.latitude,
                longitude: action.data.longitude,
                isChangingLocation:true,
                isChangedLocation:false,
            }
        }
        case REFRESH_STADIUMLIST_SUCCESS: {
            return {
                ...state,
                isChangingLocation:false,
                isChangedLocation:true,
                stadiumList:action.data,
            }
        }
        case REFRESH_STADIUMLIST_FAILURE: {
            return {
                ...state,
                isChangingLocation:false,
                isChangedLocation:false,
                changeLocationErrorReason:action.error
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}