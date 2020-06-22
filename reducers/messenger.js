export const initialState = {
    list : [], //대화한 유저 리스트
    talkData : [], //특정 유저와 대화한 대화 내용
    userId : null,
    isGettingList : false, //대화한 유저 리스트 가져오는중
    isGettedList : false, //대화한 유저 리스트 가져옴
    getListErrorResason : '', //대화한 유저 리스트 에러
    isDeletingList : false, //대화한 유저 리스트 선택 삭제중
    isDeletedList : false, //대화한 유저 리스트 선택 삭제 완료
    deleteListErrorReason : '', //대화한 유저 리스트 선택삭제 에러
}
export const SET_USER_ID = 'SET_USER_ID';

export const GET_LIST_REQUEST = 'GET_LIST_REQUEST';
export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';
export const GET_LIST_FAILURE = 'GET_LIST_FAILURE';

export const DELETE_LIST_REQUEST = 'DELETE_LIST_REQUEST';
export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';
export const DELETE_LIST_FAILURE = 'DELETE_LIST_FAILURE';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ID:{
            return {
                ...state,
                userId : action.data,
            }
        }
        case GET_LIST_REQUEST: {
            return {
                ...state,
                // list : [],
                isGettingList : true,
                isGettedList : false,
                getListErrorResason : '',
            }
        }
        case GET_LIST_SUCCESS: {
            return {
                ...state,
                list : action.data,
                isGettingList : false,
                isGettedList : true,
            }
        }
        case GET_LIST_FAILURE: {
            return {
                ...state,
                isGettingList : false,
                getListErrorResason : action.error,
            }
        }
        case DELETE_LIST_REQUEST: {
            return {
                ...state,
                isDeletingList : true,
                isDeletedList : false,
                deleteListErrorReason : '',
            }
        }
        case DELETE_LIST_SUCCESS: {
            return {
                ...state,
                list : action.data,
                isDeletingList : false,
                isDeletedList : true,
            }
        }
        case DELETE_LIST_FAILURE: {
            return {
                ...state,
                isDeletingList : false,
                deleteListErrorReason : action.error,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}